const db = require("../../config/db");

const BET_STATUS_DISPLAY = {
  1: "당첨",
  2: "낙첨",
  3: "취소",
};

/**
 * GET /api/admin/arcade-betting
 * List arcade betting records with filters and summary
 */
exports.getArcadeBettings = async (req, res) => {
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

    let whereClause = "WHERE ab.is_deleted = 0";
    const params = [];

    if (startDate && startDate.trim() !== "") {
      whereClause += " AND ab.bet_time >= ?";
      params.push(startDate);
    }
    if (endDate && endDate.trim() !== "") {
      whereClause += " AND ab.bet_time <= ?";
      params.push(endDate);
    }
    if (gameTypeIdx && gameTypeIdx !== "") {
      whereClause += " AND ab.game_type_id = ?";
      params.push(parseInt(gameTypeIdx, 10));
    }
    if (betStatus && betStatus !== "") {
      whereClause += " AND ab.bet_status = ?";
      params.push(parseInt(betStatus, 10));
    }

    if (searchType && searchText && searchText.trim() !== "") {
      if (searchType === "id") {
        whereClause += " AND u.username LIKE ?";
        params.push(`%${searchText}%`);
      } else if (searchType === "nick") {
        whereClause += " AND u.nickname LIKE ?";
        params.push(`%${searchText}%`);
      } else if (searchType === "gameInning") {
        whereClause += " AND agl.game_inning LIKE ?";
        params.push(`%${searchText}%`);
      } else if (searchType === "parent") {
        whereClause += " AND u.referrer_id = (SELECT id FROM users WHERE username = ?)";
        params.push(searchText);
      }
    }

    const query = `
      SELECT
        ab.id,
        ab.id AS no,
        u.id AS userIdx,
        u.username AS userID,
        u.nickname,
        agl.game_inning AS gameInning,
        agt.name AS gameType,
        ab.bet_item AS betItem,
        ab.odds,
        ab.before_money AS beforeMoney,
        ab.bet_money AS betMoney,
        ab.after_money AS afterMoney,
        ab.win_before_money AS winBeforeMoney,
        ab.win_money AS winMoney,
        ab.win_after_money AS winAfterMoney,
        ab.bet_status AS betStatus,
        ab.bet_time AS betTime,
        agl.result_time AS resultTime,
        agl.game_time AS gameTime
      FROM arcade_bets ab
      JOIN users u ON ab.user_id = u.id
      JOIN arcade_game_list agl ON ab.game_list_id = agl.id
      JOIN arcade_game_types agt ON ab.game_type_id = agt.id
      ${whereClause}
      ORDER BY ab.bet_time DESC
      LIMIT ? OFFSET ?
    `;

    const [rows] = await db.query(query, [...params, limit, offset]);

    const countQuery = `
      SELECT COUNT(*) AS total
      FROM arcade_bets ab
      JOIN users u ON ab.user_id = u.id
      JOIN arcade_game_list agl ON ab.game_list_id = agl.id
      ${whereClause}
    `;
    const [countRows] = await db.query(countQuery, params);
    const total = countRows[0].total;

    const summaryQuery = `
      SELECT
        IFNULL(SUM(ab.bet_money), 0) AS totalBetMoney,
        IFNULL(SUM(ab.win_money), 0) AS totalWinMoney,
        IFNULL(SUM(CASE WHEN ab.bet_status = 3 THEN ab.bet_money ELSE 0 END), 0) AS totalCancelMoney
      FROM arcade_bets ab
      JOIN users u ON ab.user_id = u.id
      JOIN arcade_game_list agl ON ab.game_list_id = agl.id
      ${whereClause}
    `;
    const [summaryRows] = await db.query(summaryQuery, params);

    const formattedRows = rows.map((r) => ({
      ...r,
      betStatusDisplay: BET_STATUS_DISPLAY[r.betStatus] || "알 수 없음",
      odds: Number(r.odds),
      beforeMoney: Number(r.beforeMoney),
      betMoney: Number(r.betMoney),
      afterMoney: Number(r.afterMoney),
      winBeforeMoney: Number(r.winBeforeMoney),
      winMoney: Number(r.winMoney),
      winAfterMoney: Number(r.winAfterMoney),
      user: {
        userIdx: r.userIdx,
        userID: r.userID,
        nickname: r.nickname,
      },
      affiliation: {
        role: "회원",
        backgroundColor: "#f4a29c",
      }
    }));

    res.status(200).json({
      success: true,
      data: formattedRows,
      summary: {
        totalBetMoney: Number(summaryRows[0].totalBetMoney),
        totalWinMoney: Number(summaryRows[0].totalWinMoney),
        totalCancelMoney: Number(summaryRows[0].totalCancelMoney),
      },
      pagination: {
        total,
        page: parseInt(page, 10),
        pageSize: limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error in getArcadeBettings:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * DELETE /api/admin/arcade-betting/:id
 * Soft delete an arcade bet
 */
exports.deleteArcadeBet = async (req, res) => {
  try {
    const { id } = req.params;
    await db.execute("UPDATE arcade_bets SET is_deleted = 1 WHERE id = ?", [id]);
    res.status(200).json({ success: true, message: "Bet deleted successfully" });
  } catch (error) {
    console.error("Error in deleteArcadeBet:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
