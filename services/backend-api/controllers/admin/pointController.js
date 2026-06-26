const db = require("../../config/db");

exports.getPointLogs = async (req, res) => {
  try {
    const { page = 1, pageSize = 50, startDate, endDate, logTypeGroupIdx, logTypeIdx, searchType, searchText } = req.query;
    const limit = parseInt(pageSize, 10);
    const offset = (parseInt(page, 10) - 1) * limit;

    let whereClause = "WHERE 1=1";
    const queryParams = [];

    if (startDate) {
      whereClause += " AND p.created_at >= ?";
      queryParams.push(startDate);
    }
    if (endDate) {
      whereClause += " AND p.created_at <= ?";
      queryParams.push(endDate);
    }
    if (logTypeGroupIdx) {
      whereClause += " AND p.group_idx = ?";
      queryParams.push(logTypeGroupIdx);
    }
    if (logTypeIdx) {
      whereClause += " AND p.type_idx = ?";
      queryParams.push(logTypeIdx);
    }

    if (searchText && searchType) {
      if (searchType === 'id') {
        whereClause += " AND u.username LIKE ?";
        queryParams.push(`%${searchText}%`);
      } else if (searchType === 'nick') {
        whereClause += " AND u.nickname LIKE ?";
        queryParams.push(`%${searchText}%`);
      } else if (searchType === 'logmemo') {
        whereClause += " AND p.memo LIKE ?";
        queryParams.push(`%${searchText}%`);
      }
    }

    const [rows] = await db.execute(`
      SELECT 
        p.*,
        u.username,
        u.nickname,
        u.role as userRole
      FROM point_logs p
      JOIN users u ON p.user_id = u.id
      ${whereClause}
      ORDER BY p.created_at DESC
      LIMIT ? OFFSET ?
    `, [...queryParams, limit, offset]);

    const [[countResult]] = await db.execute(`
      SELECT COUNT(*) as total FROM point_logs p JOIN users u ON p.user_id = u.id ${whereClause}`, queryParams);

    const groupMap = {
      '9': '이벤트',
      '10': '수수료',
      '11': '관리자',
      '12': '포인트 전환'
    };

    const typeMap = {
      '15': '출석 체크',
      '16': '첫충',
      '17': '매충',
      '18': '베팅',
      '19': '베팅 취소',
      '20': '관리자 지급',
      '21': '관리자 회수',
      '22': '유저웹 포인트 전환',
      '23': '회원 가입',
      '24': '타이',
      '25': '돌발 이벤트',
      '26': '가입 첫충',
      '27': '회원 콤프',
      '28': '회원 콤프 취소',
      '29': '회원 콤프 타이 취소',
      '38': '파트너웹 포인트 전환',
      '42': '루징 수수료',
      '43': '낙첨 수수료',
      '44': '낙첨 수수료 취소',
      '46': '페이백 지급',
      '47': '통합 충전 보너스'
    };

    const mappedData = rows.map((r, index) => ({
      id: r.id,
      no: countResult.total - offset - index,
      affiliation: {
        role: 'System',
        backgroundColor: '#6c757d'
      },
      user: {
        userIdx: r.user_id,
        userID: r.username,
        nickname: r.nickname || r.username,
        role: r.userRole.toUpperCase(),
        backgroundColor: r.userRole === 'admin' ? '#343a40' : '#007bff'
      },
      logTypeGroup: groupMap[r.group_idx] || '기타',
      logType: typeMap[r.type_idx] || '기타',
      beforeAmount: Number(r.before_amount).toLocaleString(),
      amountDisplay: Number(r.amount).toLocaleString(),
      amountClass: r.amount >= 0 ? 'text-primary' : 'text-danger',
      afterAmount: Number(r.after_amount).toLocaleString(),
      memo: r.memo,
      transactionDate: r.created_at
    }));

    res.status(200).json({ 
      success: true, 
      data: mappedData,
      pagination: {
        total: countResult.total,
        page: parseInt(page, 10),
        pageSize: limit,
        totalPages: Math.ceil(countResult.total / limit),
        hasMore: offset + limit < countResult.total
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
