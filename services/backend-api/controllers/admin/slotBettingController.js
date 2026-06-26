const db = require("../../config/db");

exports.getSlotBettings = async (req, res) => {
  try {
    const {
      page = 1,
      pageSize = 50,
      startDate,
      endDate,
      vendorIdx,
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
      whereClause += " AND sbo.bet_time >= ?";
      params.push(startDate);
    }
    if (endDate && endDate.trim() !== "") {
      whereClause += " AND sbo.bet_time <= ?";
      params.push(endDate);
    }
    if (vendorIdx && vendorIdx !== "") {
      whereClause += " AND sbo.vendor_id = ?";
      params.push(parseInt(vendorIdx, 10));
    }
    if (betStatus && betStatus !== "") {
      if (betStatus !== "0") {
        whereClause += " AND sbo.bet_status = ?";
        params.push(parseInt(betStatus, 10));
      }
    }

    if (searchType && searchText && searchText.trim() !== "") {
      if (searchType === "id") {
        whereClause += " AND u.username LIKE ?";
        params.push(`%${searchText}%`);
      } else if (searchType === "nick") {
        whereClause += " AND u.nickname LIKE ?";
        params.push(`%${searchText}%`);
      } else if (searchType === "parent") {
        whereClause += " AND u.referrer_id = (SELECT id FROM users WHERE username = ?)";
        params.push(searchText);
      } else if (searchType === "transactionID") {
        whereClause += " AND sbo.transaction_id LIKE ?";
        params.push(`%${searchText}%`);
      }
    }

    const query = `
      SELECT
        sbo.id,
        sbo.id AS no,
        sbo.transaction_id AS transactionID,
        u.id AS userIdx,
        u.username AS userID,
        u.nickname,
        sbo.api_provider AS apiProvider,
        sbo.vendor_name AS vendor,
        sbo.game_type AS gameType,
        sbo.table_name AS tableName,
        sbo.before_bet_money AS beforeBetMoney,
        sbo.bet_money AS betMoney,
        sbo.after_bet_money AS afterBetMoney,
        sbo.before_win_money AS beforeWinMoney,
        sbo.win_money AS winMoney,
        sbo.after_win_money AS afterWinMoney,
        sbo.note,
        sbo.bet_time AS betTime,
        sbo.result_time AS resultTime,
        sbo.created_at AS createdAt
      FROM slot_bet_orders sbo
      JOIN users u ON sbo.user_id = u.id
      ${whereClause}
      ORDER BY sbo.bet_time DESC
      LIMIT ? OFFSET ?
    `;

    const [rows] = await db.query(query, [...params, limit, offset]);

    const countQuery = `
      SELECT COUNT(*) AS total
      FROM slot_bet_orders sbo
      JOIN users u ON sbo.user_id = u.id
      ${whereClause}
    `;
    const [countRows] = await db.query(countQuery, params);
    const total = countRows[0].total;

    const summaryQuery = `
      SELECT
        IFNULL(SUM(bet_money), 0) AS totalBetMoney,
        IFNULL(SUM(CASE WHEN bet_status = 4 THEN bet_money ELSE 0 END), 0) AS totalTieMoney,
        IFNULL(SUM(CASE WHEN bet_status = 1 THEN win_money ELSE 0 END), 0) AS totalWinMoney,
        IFNULL(SUM(CASE WHEN bet_status = 5 THEN bet_money ELSE 0 END), 0) AS totalEmptyBetMoney,
        IFNULL(SUM(CASE WHEN bet_status = 5 THEN win_money ELSE 0 END), 0) AS totalEmptyWinMoney,
        IFNULL(SUM(CASE WHEN bet_status = 3 THEN bet_money ELSE 0 END), 0) AS totalCancelledMoney
      FROM slot_bet_orders sbo
      JOIN users u ON sbo.user_id = u.id
      ${whereClause}
    `;
    const [summaryRows] = await db.query(summaryQuery, params);

    const formattedRows = rows.map((r) => ({
      ...r,
      betMoney: Number(r.betMoney),
      winMoney: Number(r.winMoney),
      beforeBetMoney: Number(r.beforeBetMoney),
      afterBetMoney: Number(r.afterBetMoney),
      beforeWinMoney: Number(r.beforeWinMoney),
      afterWinMoney: Number(r.afterWinMoney),
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
        totalTieMoney: Number(summaryRows[0].totalTieMoney),
        totalWinMoney: Number(summaryRows[0].totalWinMoney),
        totalEmptyBetMoney: Number(summaryRows[0].totalEmptyBetMoney),
        totalEmptyWinMoney: Number(summaryRows[0].totalEmptyWinMoney),
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
    console.error("Error in getSlotBettings:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
