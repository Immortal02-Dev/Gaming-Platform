const db = require("../../config/db");

exports.getBoardBettings = async (req, res) => {
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

    if (startDate && startDate.trim() !== "") {
      whereClause += " AND bbo.game_time >= ?";
      params.push(startDate);
    }
    if (endDate && endDate.trim() !== "") {
      whereClause += " AND bbo.game_time <= ?";
      params.push(endDate);
    }
    if (gameTypeIdx && gameTypeIdx !== "") {
      whereClause += " AND bbo.game_type_idx = ?";
      params.push(parseInt(gameTypeIdx, 10));
    }
    if (betStatus && betStatus !== "") {
      whereClause += " AND bbo.bet_status = ?";
      params.push(parseInt(betStatus, 10));
    }

    if (searchType && searchText && searchText.trim() !== "") {
      if (searchType === "id") {
        whereClause += " AND u.username LIKE ?";
        params.push(`%${searchText}%`);
      } else if (searchType === "nick") {
        whereClause += " AND u.nickname LIKE ?";
        params.push(`%${searchText}%`);
      } else if (searchType === "transactionID") {
        whereClause += " AND bbo.transaction_id LIKE ?";
        params.push(`%${searchText}%`);
      } else if (searchType === "roundID") {
        whereClause += " AND bbo.round_id LIKE ?";
        params.push(`%${searchText}%`);
      }
    }

    const query = `
      SELECT
        bbo.id,
        bbo.id AS no,
        bbo.transaction_id AS transactionID,
        u.id AS userIdx,
        u.username AS userID,
        u.nickname,
        bbo.api_provider AS apiProvider,
        bbo.game_type_idx AS gameTypeIdx,
        bbo.game_name AS gameName,
        bbo.round_id AS roundID,
        bbo.game_holdem_group_key AS gameHoldemGroupKey,
        bbo.bet_money AS betMoney,
        bbo.win_money AS winMoney,
        bbo.jackpot,
        bbo.bet_status AS betStatus,
        bbo.bet_details AS betDetails,
        bbo.note,
        bbo.game_time AS gameTime,
        bbo.created_at AS createdAt
      FROM board_bet_orders bbo
      JOIN users u ON bbo.user_id = u.id
      ${whereClause}
      ORDER BY bbo.game_time DESC
      LIMIT ? OFFSET ?
    `;

    const [rows] = await db.query(query, [...params, limit, offset]);

    const countQuery = `
      SELECT COUNT(*) AS total
      FROM board_bet_orders bbo
      JOIN users u ON bbo.user_id = u.id
      ${whereClause}
    `;
    const [countRows] = await db.query(countQuery, params);
    const total = countRows[0].total;

    const summaryQuery = `
      SELECT
        IFNULL(SUM(bet_money), 0) AS totalBetMoney,
        IFNULL(SUM(win_money), 0) AS totalWinMoney
      FROM board_bet_orders bbo
      JOIN users u ON bbo.user_id = u.id
      ${whereClause}
    `;
    const [summaryRows] = await db.query(summaryQuery, params);

    const formattedRows = rows.map((r) => ({
      ...r,
      betMoney: Number(r.betMoney),
      winMoney: Number(r.winMoney),
      jackpot: Number(r.jackpot),
      betDetails: typeof r.betDetails === 'string' ? JSON.parse(r.betDetails) : r.betDetails,
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
      },
      pagination: {
        total,
        page: parseInt(page, 10),
        pageSize: limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error in getBoardBettings:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
