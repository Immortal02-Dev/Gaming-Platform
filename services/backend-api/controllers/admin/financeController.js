const db = require("../../config/db");

// ── Wallet & Financials ──────────────────────────────────────

const toNumber = (value) => Number(value || 0);

const formatDateKey = (value) => {
  if (!value) return null;
  return new Date(value).toISOString().split("T")[0];
};

const buildHistoryWindow = (anchorDate, rows) => {
  const byDate = new Map(
    rows.map((row) => [
      formatDateKey(row.date),
      {
        date: formatDateKey(row.date),
        deposits: toNumber(row.deposits),
        withdrawals: toNumber(row.withdrawals),
      },
    ]),
  );

  const history = [];
  const end = new Date(`${anchorDate}T00:00:00`);
  for (let offset = 6; offset >= 0; offset -= 1) {
    const day = new Date(end);
    day.setDate(end.getDate() - offset);
    const date = formatDateKey(day);
    history.push(byDate.get(date) || { date, deposits: 0, withdrawals: 0 });
  }

  return history;
};

exports.getPlatformStats = async (req, res) => {
  try {
    const [[totalUsers]] = await db.execute("SELECT COUNT(*) as count FROM users");
    const [[totalBets]] = await db.execute("SELECT COUNT(*) as count, COALESCE(SUM(amount), 0) as volume FROM bets");
    const [[latestTransaction]] = await db.execute(`
      SELECT DATE(MAX(created_at)) as latestDate
      FROM wallet_transactions
      WHERE type IN ('deposit', 'withdraw') AND status = 'completed'
    `);

    const anchorDate = formatDateKey(latestTransaction.latestDate) || formatDateKey(new Date());
    const [anchorYear, anchorMonth] = anchorDate.split("-").map(Number);

    const [[todayCharge]] = await db.execute(`
      SELECT COALESCE(SUM(amount), 0) as total, COUNT(*) as count
      FROM wallet_transactions
      WHERE type = 'deposit' AND status = 'completed' AND DATE(created_at) = ?
    `, [anchorDate]);

    const [[todayExchange]] = await db.execute(`
      SELECT COALESCE(SUM(amount), 0) as total, COUNT(*) as count
      FROM wallet_transactions
      WHERE type = 'withdraw' AND status = 'completed' AND DATE(created_at) = ?
    `, [anchorDate]);

    const [[monthCharge]] = await db.execute(`
      SELECT COALESCE(SUM(amount), 0) as total, COUNT(*) as count
      FROM wallet_transactions
      WHERE type = 'deposit' AND status = 'completed'
      AND YEAR(created_at) = ? AND MONTH(created_at) = ?
    `, [anchorYear, anchorMonth]);

    const [[monthExchange]] = await db.execute(`
      SELECT COALESCE(SUM(amount), 0) as total, COUNT(*) as count
      FROM wallet_transactions
      WHERE type = 'withdraw' AND status = 'completed'
      AND YEAR(created_at) = ? AND MONTH(created_at) = ?
    `, [anchorYear, anchorMonth]);

    const [historyRows] = await db.execute(`
      SELECT
        DATE(created_at) as date,
        COALESCE(SUM(CASE WHEN type = 'deposit' THEN amount ELSE 0 END), 0) as deposits,
        COALESCE(SUM(CASE WHEN type = 'withdraw' THEN amount ELSE 0 END), 0) as withdrawals
      FROM wallet_transactions
      WHERE status = 'completed'
        AND type IN ('deposit', 'withdraw')
        AND DATE(created_at) BETWEEN DATE_SUB(?, INTERVAL 6 DAY) AND ?
      GROUP BY DATE(created_at)
      ORDER BY date ASC
    `, [anchorDate, anchorDate]);

    const [recent] = await db.execute(`
      SELECT
        t.id,
        COALESCE(u.username, CONCAT('User #', t.user_id)) as username,
        t.type,
        t.amount,
        t.currency,
        t.status,
        t.created_at
      FROM wallet_transactions t
      LEFT JOIN users u ON t.user_id = u.id
      WHERE t.type IN ('deposit', 'withdraw')
      ORDER BY t.created_at DESC
      LIMIT 5
    `);

    res.status(200).json({
      success: true,
      data: {
        totalUsers: toNumber(totalUsers.count),
        totalBets: toNumber(totalBets.count),
        bettingVolume: toNumber(totalBets.volume),
        statsDate: anchorDate,
        today: {
          chargeAmount: toNumber(todayCharge.total),
          chargeCount: toNumber(todayCharge.count),
          exchangeAmount: toNumber(todayExchange.total),
          exchangeCount: toNumber(todayExchange.count),
          profit: toNumber(todayCharge.total) - toNumber(todayExchange.total),
        },
        month: {
          chargeAmount: toNumber(monthCharge.total),
          chargeCount: toNumber(monthCharge.count),
          exchangeAmount: toNumber(monthExchange.total),
          exchangeCount: toNumber(monthExchange.count),
          profit: toNumber(monthCharge.total) - toNumber(monthExchange.total),
        },
        history: buildHistoryWindow(anchorDate, historyRows),
        recent: recent.map((tx) => ({
          ...tx,
          amount: toNumber(tx.amount),
        })),
      },
    });
  } catch (error) {
    console.error("Failed to fetch platform stats:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllTransactions = async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT t.*, u.username 
      FROM wallet_transactions t 
      JOIN users u ON t.user_id = u.id 
      ORDER BY t.created_at DESC
    `);
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getPendingTransactions = async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT t.*, u.username 
      FROM wallet_transactions t 
      JOIN users u ON t.user_id = u.id 
      WHERE t.status = 'pending'
      ORDER BY t.created_at DESC
    `);
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.approveTransaction = async (req, res) => {
  const connection = await db.getConnection();
  try {
    const { id } = req.params;
    await connection.beginTransaction();

    const [transactions] = await connection.query(
      "SELECT * FROM wallet_transactions WHERE id = ? FOR UPDATE",
      [id],
    );
    if (transactions.length === 0) throw new Error("Transaction not found");
    const trans = transactions[0];

    if (trans.status !== "pending")
      throw new Error("Transaction already processed");

    // Update status
    await connection.query(
      "UPDATE wallet_transactions SET status = 'completed' WHERE id = ?",
      [id],
    );

    // If it's a deposit, add to user balance
    if (trans.type === "deposit") {
      const [bal] = await connection.query(
        "SELECT amount FROM user_balances WHERE user_id = ? AND currency = ? FOR UPDATE",
        [trans.user_id, trans.currency],
      );
      if (bal.length > 0) {
        await connection.query(
          "UPDATE user_balances SET amount = amount + ? WHERE user_id = ? AND currency = ?",
          [trans.amount, trans.user_id, trans.currency],
        );
      } else {
        await connection.query(
          "INSERT INTO user_balances (user_id, currency, amount) VALUES (?, ?, ?)",
          [trans.user_id, trans.currency, trans.amount],
        );
      }
    }

    await connection.commit();
    res.status(200).json({ success: true, message: "Transaction approved" });
  } catch (error) {
    await connection.rollback();
    res.status(500).json({ success: false, message: error.message });
  } finally {
    connection.release();
  }
};

exports.rejectTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    await db.execute(
      "UPDATE wallet_transactions SET status = 'rejected' WHERE id = ?",
      [id],
    );
    res.status(200).json({ success: true, message: "Transaction rejected" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.adjustBalance = async (req, res) => {
  const connection = await db.getConnection();
  try {
    const { userId, amount, type, currency, notes } = req.body;
    
    if (!userId || !amount || !type || !currency) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    await connection.beginTransaction();

    // 1. Get current balance
    const [balances] = await connection.query(
      "SELECT amount FROM user_balances WHERE user_id = ? AND currency = ? FOR UPDATE",
      [userId, currency]
    );

    let currentBalance = 0;
    if (balances.length > 0) {
      currentBalance = Number(balances[0].amount);
    }

    const adjustmentAmount = type === "credit" ? Math.abs(amount) : -Math.abs(amount);
    const newBalance = currentBalance + adjustmentAmount;

    if (newBalance < 0 && type === "debit") {
      throw new Error("Insufficient funds for debit adjustment");
    }

    // 2. Update balance
    if (balances.length > 0) {
      await connection.query(
        "UPDATE user_balances SET amount = ? WHERE user_id = ? AND currency = ?",
        [newBalance, userId, currency]
      );
    } else {
      await connection.query(
        "INSERT INTO user_balances (user_id, currency, amount) VALUES (?, ?, ?)",
        [userId, currency, newBalance]
      );
    }

    // 3. Log transaction
    await connection.query(
      "INSERT INTO wallet_transactions (user_id, type, currency, amount, balance_after, status, tx_hash) VALUES (?, ?, ?, ?, ?, 'completed', ?)",
      [userId, 'admin_adjustment', currency, adjustmentAmount, newBalance, notes || `Admin adjustment (${type})`]
    );

    await connection.commit();
    res.status(200).json({ success: true, message: `Balance adjusted by ${adjustmentAmount} ${currency}` });
  } catch (error) {
    await connection.rollback();
    res.status(500).json({ success: false, message: error.message });
  } finally {
    connection.release();
  }
};

exports.getWebhookLogs = async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT * FROM payment_webhook_logs 
      ORDER BY created_at DESC 
      LIMIT 100
    `);
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getCharges = async (req, res) => {
  try {
    const { page = 1, pageSize = 50, startDate, endDate, moneyRequestType, moneyStatusIdx, searchType, searchText } = req.query;
    const limit = parseInt(pageSize, 10) || 50;
    const pageNum = parseInt(page, 10) || 1;
    const offset = (pageNum - 1) * limit;

    let whereClause = "WHERE t.type = 'deposit'";
    const queryParams = [];

    if (startDate) {
      whereClause += " AND DATE(t.created_at) >= ?";
      queryParams.push(startDate);
    }
    if (endDate) {
      whereClause += " AND DATE(t.created_at) <= ?";
      queryParams.push(endDate);
    }
    if (moneyStatusIdx) {
      const statusMap = { '1': 'requested', '2': 'pending', '3': 'approved', '4': 'cancelled' };
      whereClause += " AND t.status = ?";
      queryParams.push(statusMap[moneyStatusIdx] || 'requested');
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

    const [rows] = await db.query(`
      SELECT 
        t.id,
        t.user_id as userIdx,
        'user' as requestType,
        NULL as chargeApi,
        u.username as depositor,
        t.amount as requestAmount,
        t.balance_after as afterAmount,
        0 as bonusAmount,
        0 as bonusFirstRate,
        0 as bonusEveryRate,
        t.status,
        u.username as display,
        'Admin' as processor,
        '127.0.0.1' as requestIp,
        t.created_at as requestedAt,
        t.created_at as confirmedAt,
        t.created_at as processedAt,
        u.username as username
      FROM wallet_transactions t 
      JOIN users u ON t.user_id = u.id 
      ${whereClause}
      ORDER BY t.created_at DESC
      LIMIT ? OFFSET ?
    `, [...queryParams, limit, offset]);

    // Calculate summary
    const [[summary]] = await db.query(`
      SELECT 
        SUM(amount) as totalAmount,
        SUM(CASE WHEN status = 'approved' THEN amount ELSE 0 END) as approvedAmount,
        SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) as pendingAmount,
        SUM(CASE WHEN status = 'cancelled' THEN amount ELSE 0 END) as cancelledAmount
      FROM wallet_transactions 
      WHERE type = 'deposit'
    `);

    const [[countResult]] = await db.query(`
      SELECT COUNT(*) as total 
      FROM wallet_transactions t
      JOIN users u ON t.user_id = u.id
      ${whereClause}
    `, queryParams);

    // Map to frontend structure
    const mappedData = rows.map((r, index) => ({
      id: r.id,
      rowNumber: countResult.total - offset - index,
      requestType: 'user',
      chargeApi: null,
      parent: { role: 'Partner', color: '#6c757d', display: 'System', userIdx: 1 },
      user: { display: r.username, userIdx: r.userIdx, warningLevel: 0 },
      depositor: r.depositor,
      requestAmount: Number(r.requestAmount),
      afterAmount: Number(r.afterAmount),
      bonusAmount: 0,
      bonusFirstRate: 0,
      bonusEveryRate: 0,
      status: r.status,
      statusLabel: r.status.toUpperCase(),
      processor: 'System',
      requestIp: '127.0.0.1',
      requestedAt: r.requestedAt,
      confirmedAt: r.confirmedAt,
      processedAt: r.processedAt
    }));

    res.status(200).json({ 
      success: true, 
      data: mappedData,
      summary: {
        totalAmount: Number(summary.totalAmount || 0),
        approvedAmount: Number(summary.approvedAmount || 0),
        pendingAmount: Number(summary.pendingAmount || 0),
        cancelledAmount: Number(summary.cancelledAmount || 0)
      },
      pagination: {
        total: countResult.total,
        page: pageNum,
        pageSize: limit,
        totalPages: Math.ceil(countResult.total / limit),
        hasMore: offset + limit < countResult.total
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getExchanges = async (req, res) => {
  try {
    const { page = 1, pageSize = 50, startDate, endDate, moneyRequestType, moneyStatusIdx, searchType, searchText } = req.query;
    const limit = parseInt(pageSize, 10) || 50;
    const pageNum = parseInt(page, 10) || 1;
    const offset = (pageNum - 1) * limit;

    let whereClause = "WHERE t.type = 'withdraw'";
    const queryParams = [];

    if (startDate) {
      whereClause += " AND DATE(t.created_at) >= ?";
      queryParams.push(startDate);
    }
    if (endDate) {
      whereClause += " AND DATE(t.created_at) <= ?";
      queryParams.push(endDate);
    }
    if (moneyStatusIdx) {
      const statusMap = { '1': 'requested', '2': 'pending', '3': 'approved', '4': 'cancelled' };
      whereClause += " AND t.status = ?";
      queryParams.push(statusMap[moneyStatusIdx] || 'requested');
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

    const [rows] = await db.query(`
      SELECT 
        t.id,
        t.user_id as userIdx,
        'user' as requestType,
        u.username as bankerName,
        'Default Bank' as bankName,
        '123-456-789' as accountNumber,
        t.amount as requestAmount,
        t.balance_after as afterAmount,
        t.status,
        u.username as display,
        'Admin' as processor,
        '127.0.0.1' as requestIp,
        t.created_at as requestedAt,
        t.created_at as confirmedAt,
        t.created_at as processedAt,
        u.username as username
      FROM wallet_transactions t 
      JOIN users u ON t.user_id = u.id 
      ${whereClause}
      ORDER BY t.created_at DESC
      LIMIT ? OFFSET ?
    `, [...queryParams, limit, offset]);

    // Calculate summary
    const [[summary]] = await db.query(`
      SELECT 
        SUM(amount) as totalAmount,
        SUM(CASE WHEN status = 'approved' THEN amount ELSE 0 END) as approvedAmount,
        SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) as pendingAmount,
        SUM(CASE WHEN status = 'cancelled' THEN amount ELSE 0 END) as cancelledAmount
      FROM wallet_transactions 
      WHERE type = 'withdraw'
    `);

    const [[countResult]] = await db.query(`
      SELECT COUNT(*) as total 
      FROM wallet_transactions t
      JOIN users u ON t.user_id = u.id
      ${whereClause}
    `, queryParams);

    const mappedData = rows.map((r, index) => ({
      id: r.id,
      rowNumber: countResult.total - offset - index,
      requestType: 'user',
      parent: { role: 'Partner', color: '#6c757d', display: 'System', userIdx: 1 },
      user: { display: r.username, userIdx: r.userIdx, warningLevel: 0 },
      bankerName: r.bankerName,
      bankName: r.bankName,
      accountNumber: r.accountNumber,
      requestAmount: Math.abs(Number(r.requestAmount)),
      afterAmount: Number(r.afterAmount),
      status: r.status,
      statusLabel: r.status.toUpperCase(),
      processor: 'System',
      requestIp: '127.0.0.1',
      requestedAt: r.requestedAt,
      confirmedAt: r.confirmedAt,
      processedAt: r.processedAt
    }));

    res.status(200).json({ 
      success: true, 
      data: mappedData,
      summary: {
        totalAmount: Math.abs(Number(summary.totalAmount || 0)),
        approvedAmount: Math.abs(Number(summary.approvedAmount || 0)),
        pendingAmount: Math.abs(Number(summary.pendingAmount || 0)),
        cancelledAmount: Math.abs(Number(summary.cancelledAmount || 0))
      },
      pagination: {
        total: countResult.total,
        page: pageNum,
        pageSize: limit,
        totalPages: Math.ceil(countResult.total / limit),
        hasMore: offset + limit < countResult.total
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getManualMoneyLogs = async (req, res) => {
  try {
    const { page = 1, pageSize = 50, startDate, endDate, logType, searchType, searchText } = req.query;
    const limit = parseInt(pageSize, 10) || 50;
    const pageNum = parseInt(page, 10) || 1;
    const offset = (pageNum - 1) * limit;

    let whereClause = "WHERE t.type = 'admin_adjustment'";
    const queryParams = [];

    if (startDate) {
      whereClause += " AND DATE(t.created_at) >= ?";
      queryParams.push(startDate);
    }
    if (endDate) {
      whereClause += " AND DATE(t.created_at) <= ?";
      queryParams.push(endDate);
    }
    if (logType) {
      // Mapping logType to adjustment values or sub-types if needed
      if (logType === 'userDeposit') whereClause += " AND t.amount > 0";
      else if (logType === 'userWithdraw') whereClause += " AND t.amount < 0";
    }

    if (searchText && searchType) {
      if (searchType === 'userID') {
        whereClause += " AND u.username LIKE ?";
        queryParams.push(`%${searchText}%`);
      } else if (searchType === 'userNickName') {
        whereClause += " AND u.nickname LIKE ?";
        queryParams.push(`%${searchText}%`);
      }
    }

    const [rows] = await db.query(`
      SELECT 
        t.id,
        t.user_id as userIdx,
        u.username,
        u.nickname,
        u.role as userRole,
        t.amount,
        t.balance_after,
        t.created_at
      FROM wallet_transactions t
      JOIN users u ON t.user_id = u.id
      ${whereClause}
      ORDER BY t.created_at DESC
      LIMIT ? OFFSET ?
    `, [...queryParams, limit, offset]);

    const [[countResult]] = await db.query(`
      SELECT COUNT(*) as total FROM wallet_transactions t JOIN users u ON t.user_id = u.id ${whereClause}`, queryParams);

    // Summary calculations
    const [[summary]] = await db.execute(`
      SELECT 
        SUM(CASE WHEN amount > 0 THEN amount ELSE 0 END) as totalDeposit,
        ABS(SUM(CASE WHEN amount < 0 THEN amount ELSE 0 END)) as totalWithdraw,
        SUM(CASE WHEN amount > 0 AND u.role = 'user' THEN amount ELSE 0 END) as userDeposit,
        ABS(SUM(CASE WHEN amount < 0 AND u.role = 'user' THEN amount ELSE 0 END)) as userWithdraw,
        SUM(CASE WHEN amount > 0 AND u.role = 'agent' THEN amount ELSE 0 END) as partnerDeposit,
        ABS(SUM(CASE WHEN amount < 0 AND u.role = 'agent' THEN amount ELSE 0 END)) as partnerWithdraw
      FROM wallet_transactions t
      JOIN users u ON t.user_id = u.id
      WHERE t.type = 'admin_adjustment'
    `);

    const mappedData = rows.map((r, index) => ({
      id: r.id,
      no: countResult.total - offset - index,
      logType: r.amount > 0 ? (r.userRole === 'agent' ? '파트너 지급' : '회원 지급') : (r.userRole === 'agent' ? '파트너 회수' : '회원 회수'),
      applicant: {
        userIdx: r.userIdx,
        display: `${r.username} (${r.nickname || r.username})`,
        role: r.userRole.toUpperCase(),
        backgroundColor: r.userRole === 'agent' ? '#6aa84f' : '#007bff'
      },
      applicantBeforeAmount: Number(r.balance_after - r.amount).toLocaleString(),
      applicantAmount: Number(r.amount).toLocaleString(),
      applicantAfterAmount: Number(r.balance_after).toLocaleString(),
      processor: {
        userIdx: 1,
        display: 'admin (관리자)',
        role: 'ADMIN',
        backgroundColor: '#343a40'
      },
      processorBeforeAmount: '0',
      processorAmount: Number(r.amount).toLocaleString(),
      processorAfterAmount: '0',
      requestedAt: r.created_at,
      processedAt: r.created_at
    }));

    res.status(200).json({ 
      success: true, 
      data: mappedData,
      summary: {
        totalDeposit: Number(summary.totalDeposit || 0).toLocaleString(),
        totalWithdraw: Number(summary.totalWithdraw || 0).toLocaleString(),
        userDeposit: Number(summary.userDeposit || 0).toLocaleString(),
        userWithdraw: Number(summary.userWithdraw || 0).toLocaleString(),
        partnerDeposit: Number(summary.partnerDeposit || 0).toLocaleString(),
        partnerWithdraw: Number(summary.partnerWithdraw || 0).toLocaleString()
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getDeposits = async (req, res) => {
  try {
    const { page = 1, pageSize = 50 } = req.query;
    const limit = parseInt(pageSize, 10) || 50;
    const pageNum = parseInt(page, 10) || 1;
    const offset = (pageNum - 1) * limit;

    const [rows] = await db.query(`
      SELECT t.*, u.username 
      FROM wallet_transactions t 
      JOIN users u ON t.user_id = u.id 
      WHERE t.type = 'deposit'
      ORDER BY t.created_at DESC
      LIMIT ? OFFSET ?
    `, [limit, offset]);

    const [[countResult]] = await db.query(`
      SELECT COUNT(*) as total 
      FROM wallet_transactions 
      WHERE type = 'deposit'
    `);

    res.status(200).json({ 
      success: true, 
      data: rows,
      pagination: {
        total: countResult.total,
        page: pageNum,
        pageSize: limit,
        totalPages: Math.ceil(countResult.total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
