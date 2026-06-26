const db = require("../../config/db");

const GAME_TYPE_NAMES = {
  4:  "파워볼(PBG)",
  10: "EOS파워볼5분",
  11: "EOS파워볼3분",
  12: "코인파워볼5분",
  13: "코인파워볼3분",
  14: "코인사다리5분",
  15: "코인사다리3분",
};

const STATUS_NAMES = {
  1: "베팅 가능",
  2: "베팅 마감",
  3: "결과 마감",
  4: "취소",
};

/**
 * GET /api/admin/arcade-games
 * List arcade game rounds with filtering and pagination
 */
exports.getArcadeGames = async (req, res) => {
  try {
    const {
      page = 1,
      pageSize = 50,
      startDate,
      endDate,
      gameTypeIdx,
      betStatus,
      searchType,
      searchText,
    } = req.query;

    const limit = parseInt(pageSize, 10) || 50;
    const pageNum = parseInt(page, 10) || 1;
    const offset = (pageNum - 1) * limit;

    let whereClause = "WHERE 1=1";
    const params = [];

    // Date filter on game_time
    if (startDate && startDate.trim() !== "") {
      whereClause += " AND DATE(agl.game_time) >= ?";
      params.push(startDate);
    }
    if (endDate && endDate.trim() !== "") {
      whereClause += " AND DATE(agl.game_time) <= ?";
      params.push(endDate);
    }

    // Game type filter
    if (gameTypeIdx && gameTypeIdx !== "") {
      whereClause += " AND agl.game_type_id = ?";
      params.push(parseInt(gameTypeIdx, 10));
    }

    // Status filter
    if (betStatus && betStatus !== "") {
      whereClause += " AND agl.game_arcade_status = ?";
      params.push(parseInt(betStatus, 10));
    }

    // Text search
    if (searchType && searchText && searchText.trim() !== "") {
      if (searchType === "gameInning") {
        whereClause += " AND agl.game_inning LIKE ?";
        params.push(`%${searchText}%`);
      } else if (searchType === "gameTodayInning") {
        whereClause += " AND agl.game_today_inning LIKE ?";
        params.push(`%${searchText}%`);
      }
    }

    const query = `
      SELECT
        agl.id AS gameArcadeListIdx,
        agl.game_type_id AS gameTypeIdx,
        agt.name AS gameTypeName,
        agl.game_inning AS gameInning,
        agl.game_today_inning AS gameTodayInning,
        agl.game_arcade_status AS gameArcadeStatus,
        agl.bet_money AS betMoney,
        agl.win_money AS winMoney,
        agl.game_time AS gameTime,
        agl.bet_close_time AS betCloseTime,
        agl.result_time AS resultTime
      FROM arcade_game_list agl
      JOIN arcade_game_types agt ON agl.game_type_id = agt.id
      ${whereClause}
      ORDER BY agl.game_time DESC
      LIMIT ? OFFSET ?
    `;

    const [rows] = await db.query(query, [...params, limit, offset]);

    const countQuery = `
      SELECT COUNT(*) AS total
      FROM arcade_game_list agl
      JOIN arcade_game_types agt ON agl.game_type_id = agt.id
      ${whereClause}
    `;
    const [countRows] = await db.query(countQuery, params);
    const total = countRows[0].total;

    const data = rows.map((r) => ({
      ...r,
      gameArcadeStatusName: STATUS_NAMES[r.gameArcadeStatus] || "알 수 없음",
      betMoney: Number(r.betMoney) || 0,
      winMoney: Number(r.winMoney) || 0,
    }));

    res.status(200).json({
      success: true,
      data,
      pagination: {
        total,
        page: parseInt(page, 10),
        pageSize: limit,
        totalPages: Math.ceil(total / limit),
        hasMore: offset + limit < total,
      },
    });
  } catch (error) {
    console.error("Error in getArcadeGames:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * GET /api/admin/arcade-games/:id/detail
 * Get detailed round info including betting stats per item and recent bets
 */
exports.getArcadeGameDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const { gameTypeIdx } = req.query;

    // Main round data
    const [rounds] = await db.execute(`
      SELECT
        agl.id AS gameArcadeListIdx,
        agl.game_type_id AS gameTypeIdx,
        agt.name AS gameTypeName,
        agl.game_inning AS gameInning,
        agl.game_today_inning AS gameTodayInning,
        agl.game_arcade_status AS gameArcadeStatus,
        agl.bet_money AS betMoney,
        agl.win_money AS winMoney,
        agl.game_time AS gameTime,
        agl.bet_close_time AS betCloseTime,
        agl.result_time AS resultTime,
        agl.result_data AS resultData
      FROM arcade_game_list agl
      JOIN arcade_game_types agt ON agl.game_type_id = agt.id
      WHERE agl.id = ?
    `, [id]);

    if (rounds.length === 0) {
      return res.status(404).json({ success: false, error: "Game round not found" });
    }

    const round = rounds[0];

    // Betting stats by item
    const [bettingStats] = await db.execute(`
      SELECT
        bet_item AS betItem,
        COUNT(*) AS betCount,
        SUM(bet_money) AS totalBetMoney,
        SUM(win_money) AS totalWinMoney,
        AVG(odds) AS avgOdds
      FROM arcade_bets
      WHERE game_list_id = ?
      GROUP BY bet_item
    `, [id]);

    // Recent bets (last 20)
    const [recentBets] = await db.execute(`
      SELECT
        ab.id,
        u.username AS userId,
        u.nickname,
        ab.bet_item AS betItem,
        ab.odds,
        ab.bet_money AS betMoney,
        ab.win_money AS winMoney,
        ab.bet_status AS betStatus,
        ab.bet_time AS betTime
      FROM arcade_bets ab
      JOIN users u ON ab.user_id = u.id
      WHERE ab.game_list_id = ?
      ORDER BY ab.bet_time DESC
      LIMIT 20
    `, [id]);

    res.status(200).json({
      success: true,
      data: {
        ...round,
        gameArcadeStatusName: STATUS_NAMES[round.gameArcadeStatus] || "알 수 없음",
        betMoney: Number(round.betMoney) || 0,
        winMoney: Number(round.winMoney) || 0,
        bettingStatsByItem: bettingStats.map((s) => ({
          ...s,
          totalBetMoney: Number(s.totalBetMoney) || 0,
          totalWinMoney: Number(s.totalWinMoney) || 0,
          avgOdds: Number(s.avgOdds) || 0,
        })),
        recentBets: recentBets.map((b) => ({
          ...b,
          betMoney: Number(b.betMoney) || 0,
          winMoney: Number(b.winMoney) || 0,
        })),
      },
    });
  } catch (error) {
    console.error("Error in getArcadeGameDetail:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * PATCH /api/admin/arcade-games/:id/status
 * Update the status of a game round
 */
exports.updateArcadeGameStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { gameArcadeStatus } = req.body;

    const validStatuses = [1, 2, 3, 4];
    if (!validStatuses.includes(parseInt(gameArcadeStatus, 10))) {
      return res.status(400).json({ success: false, error: "Invalid status value" });
    }

    await db.execute(
      `UPDATE arcade_game_list SET game_arcade_status = ? WHERE id = ?`,
      [parseInt(gameArcadeStatus, 10), id]
    );

    res.status(200).json({
      success: true,
      message: `상태가 ${STATUS_NAMES[gameArcadeStatus]}(으)로 변경되었습니다.`,
    });
  } catch (error) {
    console.error("Error in updateArcadeGameStatus:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
