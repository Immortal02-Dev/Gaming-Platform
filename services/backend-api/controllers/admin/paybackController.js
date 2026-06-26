const db = require("../../config/db");

exports.getAllPaybacks = async (req, res) => {
  try {
    const { page = 1, pageSize = 50, startDate, endDate, paybackType, paybackStatus, searchType, searchText } = req.query;
    const limit = parseInt(pageSize, 10);
    const offset = (parseInt(page, 10) - 1) * limit;

    let whereClause = "WHERE 1=1";
    const queryParams = [];

    if (startDate) {
      whereClause += " AND p.apply_date >= ?";
      queryParams.push(startDate);
    }
    if (endDate) {
      whereClause += " AND p.apply_date <= ?";
      queryParams.push(endDate);
    }
    if (paybackType) {
      whereClause += " AND p.type = ?";
      queryParams.push(paybackType);
    }
    if (paybackStatus) {
      whereClause += " AND p.status = ?";
      queryParams.push(paybackStatus);
    }
    if (searchText && searchType) {
      if (searchType === 'id') {
        whereClause += " AND u.username LIKE ?";
        queryParams.push(`%${searchText}%`);
      } else if (searchType === 'nick') {
        whereClause += " AND u.nickname LIKE ?";
        queryParams.push(`%${searchText}%`);
      }
    }

    const [rows] = await db.execute(`
      SELECT 
        p.*,
        u.username,
        u.nickname,
        u.role as userRole
      FROM payback_requests p
      JOIN users u ON p.user_id = u.id
      ${whereClause}
      ORDER BY p.created_at DESC
      LIMIT ? OFFSET ?
    `, [...queryParams, limit, offset]);

    const [[countResult]] = await db.execute(`
      SELECT COUNT(*) as total FROM payback_requests p JOIN users u ON p.user_id = u.id ${whereClause}`, queryParams);

    // Calculate summary
    const [[summary]] = await db.execute(`
      SELECT 
        SUM(amount) as totalRequestAmount,
        SUM(CASE WHEN status = 3 THEN amount ELSE 0 END) as totalApprovedAmount,
        SUM(CASE WHEN status = 2 THEN amount ELSE 0 END) as waitingAmount,
        SUM(CASE WHEN status = 4 THEN amount ELSE 0 END) as cancelledAmount
      FROM payback_requests
    `);

    // Map to frontend structure
    const mappedData = rows.map((r, index) => ({
      paybackIdx: r.id,
      no: countResult.total - offset - index,
      affiliation: {
        userIdx: 1,
        userID: 'System',
        nickname: 'System',
        role: 'Partner',
        backgroundColor: '#6c757d'
      },
      applicant: {
        userIdx: r.user_id,
        userID: r.username,
        nickname: r.nickname || r.username,
        role: r.userRole.toUpperCase(),
        backgroundColor: '#007bff'
      },
      paybackType: r.type === 1 ? 'Bet-Win (Sports)' : (r.type === 2 ? 'In-Out' : 'In-Out-Bal'),
      applyDate: r.apply_date,
      requestAvailableDate: r.request_available_date,
      requestAmount: Number(r.amount).toLocaleString(),
      paybackPercent: `${r.percent}%`,
      status: r.status,
      statusBadges: [
        { label: r.status === 1 ? '신청' : (r.status === 2 ? '대기' : (r.status === 3 ? '승인' : '취소')), 
          className: r.status === 3 ? 'bg-info' : (r.status === 4 ? 'bg-danger' : 'bg-secondary') }
      ],
      totalBettingAmount: Number(r.total_betting_amount).toLocaleString(),
      totalWinAmount: Number(r.total_win_amount).toLocaleString(),
      chargeAmount: Number(r.charge_amount).toLocaleString(),
      exchangeAmount: Number(r.exchange_amount).toLocaleString(),
      balanceAmount: Number(r.balance_amount).toLocaleString(),
      requestDate: r.created_at,
      processDate: r.processed_at
    }));

    res.status(200).json({ 
      success: true, 
      data: mappedData,
      summary: {
        totalRequestAmount: Number(summary.totalRequestAmount || 0),
        totalApprovedAmount: Number(summary.totalApprovedAmount || 0),
        waitingAmount: Number(summary.waitingAmount || 0),
        cancelledAmount: Number(summary.cancelledAmount || 0)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.changeStatus = async (req, res) => {
  try {
    const { paybackIdx, paybackStatus } = req.body;
    await db.execute("UPDATE payback_requests SET status = ?, processed_at = NOW() WHERE id = ?", [paybackStatus, paybackIdx]);
    res.status(200).json({ ReturnCode: 0, ReturnMessage: "Status updated" });
  } catch (error) {
    res.status(500).json({ ReturnCode: 1, ReturnMessage: error.message });
  }
};

exports.changeStatusList = async (req, res) => {
  try {
    const { paybackIdx, paybackStatus } = req.body;
    const ids = Object.values(paybackIdx);
    if (ids.length > 0) {
      const placeholders = ids.map(() => "?").join(",");
      await db.execute(`UPDATE payback_requests SET status = ?, processed_at = NOW() WHERE id IN (${placeholders})`, [paybackStatus, ...ids]);
    }
    res.status(200).json({ ReturnCode: 0, ReturnMessage: `${ids.length} records updated` });
  } catch (error) {
    res.status(500).json({ ReturnCode: 1, ReturnMessage: error.message });
  }
};
