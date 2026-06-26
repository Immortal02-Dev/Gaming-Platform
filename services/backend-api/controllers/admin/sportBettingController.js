const db = require("../../config/db");

const BET_STATUS_DISPLAY = {
  pending: "진행중",
  win: "당첨",
  lose: "낙첨",
  cancelled: "취소",
  cancelled_by_user: "사용자취소",
};

const TYPE_FLAG_DISPLAY = {
  1: "프리매치",
  2: "라이브",
};

const TYPE_CROSS_SPECIAL_DISPLAY = {
  1: "크로스",
  2: "스페셜",
  3: "통합",
};

/**
 * GET /api/admin/sport-betting
 * List sport betting orders with filters and summary
 */
exports.getSportBettings = async (req, res) => {
  try {
    const {
      page = 1,
      pageSize = 50,
      startDate,
      endDate,
      typeFlag,
      typeCrossSpecial,
      betStatus,
      searchType,
      searchText,
    } = req.query;

    const limit = parseInt(pageSize, 10) || 50;
    const pageNum = parseInt(page, 10) || 1;
    const offset = Math.max(0, (pageNum - 1) * limit);

    let whereClause = "WHERE sbo.is_deleted = 0";
    const params = [];

    if (startDate && startDate.trim() !== "") {
      whereClause += " AND DATE(sbo.bet_time) >= ?";
      params.push(startDate);
    }
    if (endDate && endDate.trim() !== "") {
      whereClause += " AND DATE(sbo.bet_time) <= ?";
      params.push(endDate);
    }
    if (typeFlag && typeFlag !== "") {
      whereClause += " AND sbo.type_flag = ?";
      params.push(parseInt(typeFlag, 10));
    }
    if (typeCrossSpecial && typeCrossSpecial !== "") {
      whereClause += " AND sbo.type_cross_special = ?";
      params.push(parseInt(typeCrossSpecial, 10));
    }
    if (betStatus && betStatus !== "") {
      whereClause += " AND sbo.bet_status = ?";
      params.push(betStatus);
    }

    if (searchType && searchText && searchText.trim() !== "") {
      if (searchType === "id") {
        whereClause += " AND u.username LIKE ?";
        params.push(`%${searchText}%`);
      } else if (searchType === "nick") {
        whereClause += " AND u.nickname LIKE ?";
        params.push(`%${searchText}%`);
      } else if (searchType === "parent") {
        // Assuming referral system stores parent username or ID. For now, simple match.
        whereClause += " AND u.referrer_id = (SELECT id FROM users WHERE username = ?)";
        params.push(searchText);
      } else if (searchType === "gameID") {
        whereClause += " AND sbo.id = ?";
        params.push(parseInt(searchText, 10));
      }
    }

    // Main Query
    const query = `
      SELECT
        sbo.id,
        sbo.id AS no,
        u.id AS userIdx,
        u.username AS userID,
        u.nickname,
        sbo.bet_status AS betStatus,
        sbo.type_flag AS typeFlag,
        sbo.type_cross_special AS typeCrossSpecial,
        sbo.folder_count AS folderCount,
        sbo.total_odds AS totalOdds,
        sbo.bet_money AS betMoney,
        sbo.expect_win_money AS expectWinMoney,
        sbo.win_money AS winMoney,
        sbo.bet_time AS betTime,
        sbo.result_time AS resultTime
      FROM sport_bet_orders sbo
      JOIN users u ON sbo.user_id = u.id
      ${whereClause}
      ORDER BY sbo.bet_time DESC
      LIMIT ? OFFSET ?
    `;

    const [rows] = await db.query(query, [...params, limit, offset]);

    // Count and Pagination
    const countQuery = `
      SELECT COUNT(*) AS total
      FROM sport_bet_orders sbo
      JOIN users u ON sbo.user_id = u.id
      ${whereClause}
    `;
    const [countRows] = await db.query(countQuery, params);
    const total = countRows[0].total;

    // Summary Query
    const summaryQuery = `
      SELECT
        IFNULL(SUM(bet_money), 0) AS totalBetMoney,
        IFNULL(SUM(win_money), 0) AS totalWinMoney,
        IFNULL(SUM(CASE WHEN bet_status = 'lose' THEN bet_money ELSE 0 END), 0) AS totalLoseMoney,
        IFNULL(SUM(CASE WHEN bet_status IN ('cancelled', 'cancelled_by_user') THEN bet_money ELSE 0 END), 0) AS totalCancelledMoney
      FROM sport_bet_orders sbo
      JOIN users u ON sbo.user_id = u.id
      ${whereClause}
    `;
    const [summaryRows] = await db.query(summaryQuery, params);

    const formattedRows = rows.map((r) => ({
      ...r,
      betStatusDisplay: BET_STATUS_DISPLAY[r.betStatus] || r.betStatus,
      typeFlagDisplay: TYPE_FLAG_DISPLAY[r.typeFlag] || "알 수 없음",
      typeCrossSpecialDisplay: TYPE_CROSS_SPECIAL_DISPLAY[r.typeCrossSpecial] || "알 수 없음",
      betMoney: Number(r.betMoney),
      expectWinMoney: Number(r.expectWinMoney),
      winMoney: Number(r.winMoney),
      totalOdds: Number(r.totalOdds),
      user: {
        userIdx: r.userIdx,
        userID: r.userID,
        nickname: r.nickname,
      },
      affiliation: {
        role: "회원", // Mock role, can be joined from a roles table if exists
        backgroundColor: "#f4a29c",
      }
    }));

    res.status(200).json({
      success: true,
      data: formattedRows,
      summary: {
        totalBetMoney: Number(summaryRows[0].totalBetMoney),
        totalWinMoney: Number(summaryRows[0].totalWinMoney),
        totalLoseMoney: Number(summaryRows[0].totalLoseMoney),
        totalCancelledMoney: Number(summaryRows[0].totalCancelledMoney),
      },
      pagination: {
        total,
        page: parseInt(page, 10),
        pageSize: limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error in getSportBettings:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * GET /api/admin/sport-betting/detail/:id
 * Get detailed information for a single sport bet order
 */
exports.getSportBettingDetail = async (req, res) => {
  try {
    const { id } = req.params;

    // Fetch Order
    const [orders] = await db.execute(`
      SELECT
        sbo.id,
        sbo.bet_money AS betMoney,
        sbo.expect_win_money AS expectWinMoney,
        sbo.total_odds AS totalOdds,
        sbo.bet_status AS betStatus,
        sbo.bet_time AS betTime
      FROM sport_bet_orders sbo
      WHERE sbo.id = ?
    `, [id]);

    if (orders.length === 0) {
      return res.status(404).json({ success: false, message: "Betting order not found" });
    }

    const order = orders[0];
    order.betStatusDisplay = BET_STATUS_DISPLAY[order.betStatus] || order.betStatus;
    order.betMoney = Number(order.betMoney);
    order.expectWinMoney = Number(order.expectWinMoney);
    order.totalOdds = Number(order.totalOdds);

    // Fetch Details (Matches)
    const [details] = await db.execute(`
      SELECT
        me.start_time AS gameStartDate,
        s.icon_svg AS sportImage,
        s.name AS sportName,
        l.name AS leagueName,
        ht.logo AS teamHomeImage,
        ht.name AS teamHome,
        at.logo AS teamAwayImage,
        at.name AS teamAway,
        sbd.market_name AS marketName,
        sbd.selection,
        sbd.odds,
        sbd.game_result AS gameResult,
        sbd.folder_cancelled AS folderCancelled,
        sbd.result_time AS resultTime
      FROM sport_bet_details sbd
      JOIN match_events me ON sbd.match_id = me.id
      JOIN leagues l ON me.league_id = l.id
      JOIN sports s ON l.sport_id = s.id
      JOIN teams ht ON me.home_team_id = ht.id
      JOIN teams at ON me.away_team_id = at.id
      WHERE sbd.order_id = ?
    `, [id]);

    const formattedGames = details.map((g) => ({
      ...g,
      odds: Number(g.odds),
      gameResultDisplay: BET_STATUS_DISPLAY[g.gameResult] || g.gameResult,
      folderCancelled: g.folderCancelled === 1,
    }));

    res.status(200).json({
      success: true,
      data: {
        order,
        games: formattedGames,
      },
    });
  } catch (error) {
    console.error("Error in getSportBettingDetail:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
