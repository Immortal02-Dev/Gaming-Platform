const db = require("../../config/db");

exports.getPointLogs = async (req, res) => {
  try {
    const {
      page = 1,
      pageSize = 50,
      startDate,
      endDate,
      logTypeGroupIdx,
      logTypeIdx,
      userIdx,
      searchType,
      searchText,
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
      whereClause += " AND p.created_at >= ?";
      queryParams.push(startDate);
    }
    if (endDate) {
      whereClause += " AND p.created_at <= ?";
      queryParams.push(`${endDate} 23:59:59`);
    }
    if (logTypeGroupIdx) {
      whereClause += " AND p.group_idx = ?";
      queryParams.push(logTypeGroupIdx);
    }
    if (logTypeIdx) {
      whereClause += " AND p.type_idx = ?";
      queryParams.push(logTypeIdx);
    }
    if (userIdx) {
      whereClause += " AND p.user_id = ?";
      queryParams.push(userIdx);
    }

    if (searchText && searchType) {
      if (searchType === "id") {
        whereClause += " AND u.username LIKE ?";
        queryParams.push(`%${searchText}%`);
      } else if (searchType === "nick") {
        whereClause += " AND u.nickname LIKE ?";
        queryParams.push(`%${searchText}%`);
      } else if (searchType === "parent") {
        whereClause +=
          " AND u.referrer_id = (SELECT id FROM users WHERE username = ?)";
        queryParams.push(searchText);
      } else if (searchType === "logmemo") {
        whereClause += " AND p.memo LIKE ?";
        queryParams.push(`%${searchText}%`);
      }
    }

    const [rows] = await db.execute(
      `
      SELECT 
        p.*,
        u.username,
        u.nickname,
        u.role as userRole
      FROM point_logs p
      LEFT JOIN users u ON p.user_id = u.id
      ${whereClause}
      ORDER BY p.created_at DESC
      LIMIT ? OFFSET ?
    `,
      [...queryParams, limit, offset],
    );

    const [[countResult]] = await db.execute(
      `
      SELECT COUNT(*) as total FROM point_logs p
      LEFT JOIN users u ON p.user_id = u.id
      ${whereClause}`,
      queryParams,
    );

    const groupMap = {
      9: "충전",
      10: "환전",
      11: "이용",
      12: "보너스",
    };

    const typeMap = {
      15: "충전 요청",
      16: "충전",
      17: "충전 완료",
      18: "환전 요청",
      19: "환전 완료",
      20: "이용 내역",
      21: "이용 차감",
      22: "보너스 요청",
      23: "보너스",
      24: "환전",
      25: "보너스 전환",
      26: "보너스 만료",
      27: "보너스 차감",
      28: "환전 요청",
      29: "환전 취소",
      38: "관리자 포인트 지급",
      42: "관리자 차감",
      43: "관리자 지급",
      44: "관리자 차감",
      46: "관리자 지급",
      47: "관리자 포인트 차감",
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
    console.error("Error in getPointLogs:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
