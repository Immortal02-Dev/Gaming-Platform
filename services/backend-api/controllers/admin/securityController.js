const db = require("../../config/db");

// ── IP Blacklist ─────────────────────────────────────────────
exports.getBlacklist = async (req, res) => {
  try {
    const { page = 1, pageSize = 50, searchType, searchText } = req.query;
    const limit = parseInt(pageSize, 10) || 50;
    const pageNum = parseInt(page, 10) || 1;
    const offset = (pageNum - 1) * limit;

    let whereClause = "1=1";
    const params = [];

    if (searchType && searchText) {
      if (searchType === "ip") {
        whereClause += " AND ib.ip_address LIKE ?";
        params.push(`%${searchText}%`);
      } else if (searchType === "memo") {
        whereClause += " AND ib.reason LIKE ?";
        params.push(`%${searchText}%`);
      } else if (searchType === "id") {
        whereClause += " AND u.username LIKE ?";
        params.push(`%${searchText}%`);
      } else if (searchType === "nick") {
        whereClause += " AND u.nickname LIKE ?";
        params.push(`%${searchText}%`);
      } else if (searchType === "domain") {
        // Since domain is currently hardcoded in the query, we can mock a search or filter by the hardcoded value
        whereClause += " AND 'bc-game' LIKE ?";
        params.push(`%${searchText}%`);
      }
    }

    const query = `
      SELECT 
        ib.id,
        ib.ip_address as ip,
        ib.reason as memo,
        ib.blocked_at as blockedAt,
        IF(u.role = 'partner', 'partner', 'member') as grade,
        u.username as userId,
        u.nickname,
        'bc-game' as domain
      FROM ip_blacklist ib
      LEFT JOIN (
        SELECT ip_address, MAX(created_at) as max_created_at
        FROM user_login_history
        GROUP BY ip_address
      ) latest_login ON ib.ip_address = latest_login.ip_address
      LEFT JOIN user_login_history ulh ON latest_login.ip_address = ulh.ip_address AND latest_login.max_created_at = ulh.created_at
      LEFT JOIN users u ON ulh.user_id = u.id
      WHERE ${whereClause}
      ORDER BY ib.blocked_at DESC
      LIMIT ? OFFSET ?
    `;

    const countQuery = `SELECT COUNT(*) as total FROM ip_blacklist WHERE ${whereClause}`;

    const [rows] = await db.query(query, [...params, limit, offset]);
    const [countRows] = await db.query(countQuery, params);

    // Map rowNumber
    const mappedRows = rows.map((row, index) => ({
      ...row,
      rowNumber: countRows[0].total - offset - index
    }));

    res.status(200).json({
      success: true,
      data: mappedRows,
      pagination: {
        total: countRows[0].total,
        page: parseInt(page, 10),
        pageSize: limit,
        hasMore: offset + limit < countRows[0].total
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.addToBlacklist = async (req, res) => {
  const { ip, reason, expires_at } = req.body;
  try {
    await db.execute(
      "INSERT INTO ip_blacklist (ip_address, reason, expires_at) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE reason = VALUES(reason), expires_at = VALUES(expires_at)",
      [ip, reason || "Manual block", expires_at || null]
    );
    res.status(201).json({ success: true, message: `IP ${ip} blacklisted successfully.` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.removeFromBlacklist = async (req, res) => {
  const { id } = req.params;
  try {
    await db.execute("DELETE FROM ip_blacklist WHERE id = ?", [id]);
    res.status(200).json({ success: true, message: "IP removed from blacklist." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── Bet Limits ───────────────────────────────────────────────
exports.getBetLimits = async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM bet_limits ORDER BY category ASC");
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateBetLimit = async (req, res) => {
  const { id } = req.params;
  const { min_bet, max_bet, is_active } = req.body;
  try {
    await db.execute(
      "UPDATE bet_limits SET min_bet = ?, max_bet = ?, is_active = ? WHERE id = ?",
      [min_bet, max_bet, is_active ? 1 : 0, id]
    );
    res.status(200).json({ success: true, message: "Bet limit updated successfully." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── Fraud Rules ──────────────────────────────────────────────
exports.getFraudRules = async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM fraud_rules ORDER BY id ASC");
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateFraudRule = async (req, res) => {
  const { id } = req.params;
  const { criteria_json, action, is_active } = req.body;
  try {
    await db.execute(
      "UPDATE fraud_rules SET criteria_json = ?, action = ?, is_active = ? WHERE id = ?",
      [JSON.stringify(criteria_json), action, is_active ? 1 : 0, id]
    );
    res.status(200).json({ success: true, message: "Fraud rule updated." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── Security Logs (Login Attempts) ───────────────────────────
exports.getSecurityLogs = async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT * FROM login_attempts 
      WHERE attempts > 0 
      ORDER BY last_attempt DESC 
      LIMIT 100
    `);
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── Unified Login Logs ───────────────────────────────────────
exports.getAllLoginLogs = async (req, res) => {
  try {
    const { page = 1, pageSize = 50, searchType, searchText } = req.query;
    const limit = parseInt(pageSize, 10) || 50;
    const pageNum = parseInt(page, 10) || 1;
    const offset = (pageNum - 1) * limit;

    let whereClause = "1=1";
    const params = [];

    if (searchType && searchText) {
      if (searchType === "ip") {
        whereClause += " AND ulh.ip_address LIKE ?";
        params.push(`%${searchText}%`);
      } else if (searchType === "id") {
        whereClause += " AND (u.username LIKE ? OR a.username LIKE ?)";
        params.push(`%${searchText}%`, `%${searchText}%`);
      } else if (searchType === "nick") {
        whereClause += " AND (u.nickname LIKE ?)";
        params.push(`%${searchText}%`);
      } else if (searchType === "domain") {
        // mock logic for domain search
      }
    }

    const query = `
      SELECT 
        ulh.id,
        ulh.user_id,
        NULL as admin_id,
        'user' as user_type,
        IF(u.role = 'partner', 'partner', 'member') as grade,
        u.username as user_id_display,
        u.nickname,
        ulh.device_info as user_agent,
        ulh.ip_address,
        'bc-game' as domain,
        '정상' as status,
        ulh.created_at as login_at
      FROM user_login_history ulh
      LEFT JOIN users u ON ulh.user_id = u.id
      WHERE ${whereClause}
      ORDER BY ulh.created_at DESC
      LIMIT ? OFFSET ?
    `;

    const countQuery = `
      SELECT COUNT(*) as total
      FROM user_login_history ulh
      LEFT JOIN users u ON ulh.user_id = u.id
      WHERE ${whereClause}
    `;

    const [rows] = await db.query(query, [...params, limit, offset]);
    const [countRows] = await db.query(countQuery, params);
    
    res.status(200).json({
      success: true,
      data: rows,
      pagination: {
        total: countRows[0].total,
        page: parseInt(page, 10),
        pageSize: limit,
        totalPages: Math.ceil(countRows[0].total / limit),
        hasMore: offset + limit < countRows[0].total
      }
    });
  } catch (error) {
    console.error("Error fetching all login logs:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.blockIp = async (req, res) => {
  const { logIdx, logMemo } = req.body;
  try {
    const [rows] = await db.execute("SELECT ip_address FROM user_login_history WHERE id = ?", [logIdx]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, error: "Log not found" });
    }
    const ip = rows[0].ip_address;
    
    await db.execute(
      "INSERT INTO ip_blacklist (ip_address, reason) VALUES (?, ?) ON DUPLICATE KEY UPDATE reason = VALUES(reason)",
      [ip, logMemo || "Blocked from login logs"]
    );
    res.status(200).json({ success: true, message: `IP ${ip} 차단 완료` });
  } catch (error) {
    console.error("Error blocking IP:", error);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};
