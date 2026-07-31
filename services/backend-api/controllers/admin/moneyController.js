const db = require("../../config/db");

exports.getMoneyLogs = async (req, res) => {
  try {
    const {
      page = 1,
      pageSize = 50,
      startDate,
      endDate,
      logTypeGroupIdx,
      logTypeIdx,
      searchType,
      searchText,
      userIdx,
    } = req.query;
    const pageNum = parseInt(String(page), 10);
    const pageSizeNum = parseInt(String(pageSize), 10);
    const currentPage = Number.isFinite(pageNum) && pageNum > 0 ? pageNum : 1;
    const limit =
      Number.isFinite(pageSizeNum) && pageSizeNum > 0 ? pageSizeNum : 50;
    const offset = (currentPage - 1) * limit;

    let whereClause = "WHERE 1=1";
    const queryParams = [];

    if (startDate) {
      whereClause += " AND m.created_at >= ?";
      queryParams.push(startDate);
    }
    if (endDate) {
      whereClause += " AND m.created_at <= ?";
      queryParams.push(`${endDate} 23:59:59`);
    }
    if (logTypeGroupIdx) {
      whereClause += " AND m.group_idx = ?";
      queryParams.push(logTypeGroupIdx);
    }
    if (logTypeIdx) {
      whereClause += " AND m.type_idx = ?";
      queryParams.push(logTypeIdx);
    }

    if (userIdx) {
      whereClause += " AND m.user_id = ?";
      queryParams.push(userIdx);
    }

    if (searchText && searchType) {
      if (searchType === "id") {
        whereClause += " AND u.username LIKE ?";
        queryParams.push(`%${searchText}%`);
      } else if (searchType === "nick") {
        whereClause += " AND u.nickname LIKE ?";
        queryParams.push(`%${searchText}%`);
      } else if (searchType === "logmemo") {
        whereClause += " AND m.memo LIKE ?";
        queryParams.push(`%${searchText}%`);
      }
    }

    const [rows] = await db.execute(
      `
      SELECT 
        m.*,
        u.username,
        u.nickname,
        u.role as userRole
      FROM money_logs m
      LEFT JOIN users u ON m.user_id = u.id
      ${whereClause}
      ORDER BY m.created_at DESC
      LIMIT ? OFFSET ?
    `,
      [...queryParams, limit, offset],
    );

    const [[countResult]] = await db.execute(
      `
      SELECT COUNT(*) as total FROM money_logs m
      LEFT JOIN users u ON m.user_id = u.id
      ${whereClause}`,
      queryParams,
    );

    const groupMap = {
      1: "베팅",
      2: "당첨",
      3: "충전",
      4: "환전",
      5: "머니 전환",
      6: "관리자",
      7: "포인트 전환",
      8: "파트너",
      13: "쿠폰 전환",
    };

    const typeMap = {
      1: "베팅",
      2: "베팅 취소",
      3: "당첨",
      4: "당첨 취소",
      5: "충전",
      6: "환전",
      7: "환전 취소",
      8: "카지노로 전환",
      9: "사이트로 전환",
      10: "관리자 지급",
      11: "관리자 회수",
      12: "유저웹 포인트 전환",
      13: "파트너 지급",
      14: "파트너 회수",
      34: "파트너 충전",
      35: "파트너 환전",
      36: "파트너 환전 취소",
      37: "파트너웹 포인트 전환",
      39: "홀덤으로 전환",
      40: "사이트로 전환(홀덤)",
      41: "쿠폰 사용",
    };

    const mappedData = rows.map((r, index) => ({
      id: r.id,
      no: countResult.total - offset - index,
      affiliation: {
        role: "System",
        backgroundColor: "#6c757d",
      },
      user: {
        userIdx: r.user_id,
        userID: r.username || "unknown",
        nickname: r.nickname || r.username || "unknown",
        role: r.userRole ? String(r.userRole).toUpperCase() : "USER",
        backgroundColor: r.userRole === "admin" ? "#343a40" : "#007bff",
      },
      logTypeGroup: groupMap[r.group_idx] || "기타",
      logType: typeMap[r.type_idx] || "기타",
      beforeAmount: Number(r.before_amount).toLocaleString(),
      amountDisplay: Number(r.amount).toLocaleString(),
      amountClass: r.amount >= 0 ? "text-primary" : "text-danger",
      afterAmount: Number(r.after_amount).toLocaleString(),
      memo: r.memo,
      transactionDate: r.created_at,
    }));

    res.status(200).json({
      success: true,
      data: mappedData,
      pagination: {
        total: countResult.total,
        page: parseInt(page, 10),
        pageSize: limit,
        totalPages: Math.ceil(countResult.total / limit),
        hasMore: offset + limit < countResult.total,
      },
    });
  } catch (error) {
    console.error("Error in getMoneyLogs:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
