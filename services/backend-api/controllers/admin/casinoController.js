const db = require("../../config/db");

/**
 * GET /api/admin/casino-inout
 * List casino transfer logs with filters and summary
 */
exports.getCasinoTransfers = async (req, res) => {
  try {
    const {
      page = 1,
      pageSize = 50,
      startDate,
      endDate,
      exchangeType,
      exchangeStatusIdx,
      searchType,
      searchText,
    } = req.query;

    const limit = parseInt(pageSize, 10) || 50;
    const pageNum = parseInt(page, 10) || 1;
    const offset = (pageNum - 1) * limit;

    let whereClause = "WHERE 1=1";
    const params = [];

    if (startDate && startDate.trim() !== "") {
      whereClause += " AND ct.created_at >= ?";
      params.push(startDate);
    }
    if (endDate && endDate.trim() !== "") {
      whereClause += " AND ct.created_at <= ?";
      params.push(endDate + " 23:59:59");
    }
    if (exchangeType && exchangeType !== "") {
      whereClause += " AND ct.exchange_type = ?";
      params.push(exchangeType);
    }
    if (exchangeStatusIdx && exchangeStatusIdx !== "") {
      whereClause += " AND ct.status_idx = ?";
      params.push(parseInt(exchangeStatusIdx, 10));
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
      } else if (searchType === "registerId") {
        whereClause += " AND h.username LIKE ?";
        params.push(`%${searchText}%`);
      } else if (searchType === "registerNick") {
        whereClause += " AND h.nickname LIKE ?";
        params.push(`%${searchText}%`);
      }
    }

    const query = `
      SELECT
        ct.id,
        ct.id AS no,
        u.id AS userIdx,
        u.username AS userID,
        u.nickname,
        h.id AS handlerIdx,
        h.username AS handlerID,
        h.nickname AS handlerNickname,
        ct.api_provider AS apiProvider,
        ct.exchange_type AS exchangeType,
        CASE 
          WHEN ct.exchange_type = 'deposit' THEN '사이트 > 카지노'
          WHEN ct.exchange_type = 'withdraw' THEN '카지노 > 사이트'
          WHEN ct.exchange_type = 'depositHoldem' THEN '사이트 > 홀덤'
          WHEN ct.exchange_type = 'withdrawHoldem' THEN '홀덤 > 사이트'
        END AS exchangeTypeDisplay,
        ct.amount,
        ct.after_amount AS afterAmount,
        ct.status_idx AS exchangeStatusIdx,
        ct.created_at AS createdAt,
        ct.created_at AS requestDate
      FROM casino_transfers ct
      JOIN users u ON ct.user_id = u.id
      LEFT JOIN users h ON ct.handler_id = h.id
      ${whereClause}
      ORDER BY ct.created_at DESC
      LIMIT ? OFFSET ?
    `;

    const [rows] = await db.query(query, [...params, limit, offset]);

    const countQuery = `
      SELECT COUNT(*) AS total
      FROM casino_transfers ct
      JOIN users u ON ct.user_id = u.id
      LEFT JOIN users h ON ct.handler_id = h.id
      ${whereClause}
    `;
    const [countRows] = await db.query(countQuery, params);
    const total = countRows[0].total;

    // Summary calculations
    const summaryQuery = `
      SELECT
        IFNULL(SUM(CASE WHEN exchange_type = 'deposit' AND status_idx = 3 THEN amount ELSE 0 END), 0) AS deposit,
        IFNULL(SUM(CASE WHEN exchange_type = 'withdraw' AND status_idx = 3 THEN amount ELSE 0 END), 0) AS withdraw,
        IFNULL(SUM(CASE WHEN exchange_type = 'depositHoldem' AND status_idx = 3 THEN amount ELSE 0 END), 0) AS depositHoldem,
        IFNULL(SUM(CASE WHEN exchange_type = 'withdrawHoldem' AND status_idx = 3 THEN amount ELSE 0 END), 0) AS withdrawHoldem
      FROM casino_transfers ct
      JOIN users u ON ct.user_id = u.id
      ${whereClause}
    `;
    const [summaryRows] = await db.query(summaryQuery, params);

    const formattedRows = rows.map((r) => ({
      ...r,
      amount: Number(r.amount),
      afterAmount: Number(r.afterAmount),
      user: {
        userIdx: r.userIdx,
        userID: r.userID,
        nickname: r.nickname,
      },
      handler: r.handlerID ? {
        userIdx: r.handlerIdx,
        userID: r.handlerID,
        nickname: r.handlerNickname,
      } : null,
      affiliation: {
        role: "회원",
        backgroundColor: "#f4a29c",
      }
    }));

    res.status(200).json({
      success: true,
      data: formattedRows,
      summary: {
        deposit: Number(summaryRows[0].deposit),
        withdraw: Number(summaryRows[0].withdraw),
        depositHoldem: Number(summaryRows[0].depositHoldem),
        withdrawHoldem: Number(summaryRows[0].withdrawHoldem),
      },
      pagination: {
        total,
        page: parseInt(page, 10),
        pageSize: limit,
        totalPages: Math.ceil(total / limit),
        hasMore: offset + limit < total,
      },
    });
  } catch (error) {
    console.error("Error in getCasinoTransfers:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};
