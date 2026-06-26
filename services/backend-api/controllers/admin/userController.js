const db = require("../../config/db");
const bcrypt = require("bcrypt");

// ── User Management ──────────────────────────────────────────

exports.getAllUsers = async (req, res) => {
  const { 
    page = 1, 
    pageSize = 50, 
    startDate, 
    endDate, 
    userRoleIdx, 
    userLevel, 
    userStatusIdx, 
    searchType, 
    searchText 
  } = req.query;

  console.log("Fetching users with params:", { startDate, endDate, userRoleIdx, searchText });

  try {
    const limit = parseInt(pageSize, 10) || 50;
    const pageNum = parseInt(page, 10) || 1;
    const offset = (pageNum - 1) * limit;

    // Build WHERE clause
    let whereClause = "WHERE 1=1";
    const params = [];

    if (startDate && endDate && startDate.trim() !== "" && endDate.trim() !== "") {
      whereClause += " AND DATE(u.created_at) BETWEEN ? AND ?";
      params.push(startDate, endDate);
    }

    if (userRoleIdx && userRoleIdx !== "" && userRoleIdx !== "all") {
      if (userRoleIdx === "3") {
        whereClause += " AND u.role IN ('admin', 'super_admin')";
      } else if (userRoleIdx === "4") {
        whereClause += " AND u.role = 'user'";
      }
    }

    if (userStatusIdx && userStatusIdx !== "" && userStatusIdx !== "all") {
      whereClause += " AND u.status = ?";
      params.push(userStatusIdx);
    }

    if (searchText && searchText.trim() !== "" && searchType) {
      if (searchType === "id" || searchType === "userID") {
        whereClause += " AND u.username LIKE ?";
        params.push(`%${searchText}%`);
      } else if (searchType === "nickname") {
        whereClause += " AND u.nickname LIKE ?";
        params.push(`%${searchText}%`);
      }
    }

    // Get total count
    const countQuery = `SELECT COUNT(*) as total FROM users u ${whereClause}`;
    const [countResult] = await db.query(countQuery, params);
    const total = countResult[0].total;

    // Get summary data - using LEFT JOIN to include users even if they have no balance records
    const summaryQuery = `
      SELECT 
        SUM(CASE WHEN ub.currency = 'KRW' THEN ub.amount ELSE 0 END) as totalMoney,
        SUM(CASE WHEN ub.currency = 'CASINO' THEN ub.amount ELSE 0 END) as totalCasinoMoney,
        SUM(CASE WHEN ub.currency = 'POINT' THEN ub.amount ELSE 0 END) as totalPoints
      FROM users u
      LEFT JOIN user_balances ub ON u.id = ub.user_id
      ${whereClause}
    `;
    const [summaryResult] = await db.query(summaryQuery, params);

    const summary = {
      totalMoney: summaryResult[0].totalMoney || 0,
      totalCasinoMoney: summaryResult[0].totalCasinoMoney || 0,
      totalPoints: summaryResult[0].totalPoints || 0,
      totalCharge: 0,
      totalExchange: 0,
      totalInout: 0,
    };

    // Get users with pagination
    const userQuery = `
      SELECT 
        u.id, 
        u.username as userID, 
        u.nickname, 
        u.role, 
        u.status, 
        u.last_login, 
        u.last_ip_address, 
        u.created_at,
        u.is_muted,
        u.total_wagered,
        u.kyc_status,
        (SELECT username FROM users WHERE id = (SELECT referrer_id FROM referral_friends WHERE friend_user_id = u.id LIMIT 1)) as parentUsername,
        (SELECT amount FROM user_balances WHERE user_id = u.id AND currency = 'KRW' LIMIT 1) as money,
        (SELECT amount FROM user_balances WHERE user_id = u.id AND currency = 'CASINO' LIMIT 1) as casinoMoney,
        (SELECT amount FROM user_balances WHERE user_id = u.id AND currency = 'POINT' LIMIT 1) as point,
        'user' as roleType,
        1 as roleLevel
      FROM users u
      ${whereClause}
      ORDER BY u.created_at DESC
      LIMIT ? OFFSET ?
    `;

    const userParams = [...params, limit, offset];
    const [rows] = await db.query(userQuery, userParams);

    // Map rows to match frontend expectation
    const mappedRows = rows.map((r) => ({
      ...r,
      roleType: r.role === "user" ? "member" : "partner",
      roleLevel: r.role === "user" ? 1 : r.role === "super_admin" ? 1 : 2,
    }));

    res.status(200).json({
      success: true,
      data: mappedRows,
      summary,
      pagination: {
        total,
        page: pageNum,
        pageSize: limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Failed to fetch users:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.execute(
      "SELECT id, email_or_phone, username, role, status, last_login, last_ip_address, admin_notes, vip_level_id, total_wagered, kyc_status, kyc_notes, is_muted, created_at FROM users WHERE id = ?",
      [id],
    );

    if (rows.length === 0)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    res.status(200).json({ success: true, data: rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email_or_phone, role, vip_level_id, status, admin_notes } = req.body;
    
    const updates = [];
    const params = [];
    
    if (username !== undefined) { updates.push("username = ?"); params.push(username); }
    if (email_or_phone !== undefined) { updates.push("email_or_phone = ?"); params.push(email_or_phone); }
    if (role !== undefined) { updates.push("role = ?"); params.push(role); }
    if (vip_level_id !== undefined) { updates.push("vip_level_id = ?"); params.push(vip_level_id); }
    if (status !== undefined) { updates.push("status = ?"); params.push(status); }
    if (admin_notes !== undefined) { updates.push("admin_notes = ?"); params.push(admin_notes); }
    
    if (updates.length === 0) return res.status(400).json({ success: false, message: "No fields to update" });
    
    params.push(id);
    await db.execute(
      `UPDATE users SET ${updates.join(', ')} WHERE id = ?`,
      params
    );

    res.status(200).json({ success: true, message: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateKycStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;
    
    await db.execute(
      "UPDATE users SET kyc_status = ?, kyc_notes = ? WHERE id = ?",
      [status, notes || null, id]
    );

    res.status(200).json({ success: true, message: `KYC status updated to ${status}` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.toggleMute = async (req, res) => {
  try {
    const { id } = req.params;
    const { isMuted } = req.body;
    
    await db.execute(
      "UPDATE users SET is_muted = ? WHERE id = ?",
      [isMuted ? 1 : 0, id]
    );

    res.status(200).json({ success: true, message: `User ${isMuted ? 'muted' : 'unmuted'} successfully` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getLoginHistory = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.execute(
      "SELECT * FROM user_login_history WHERE user_id = ? ORDER BY created_at DESC LIMIT 50",
      [id]
    );
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { username, email_or_phone, password, role } = req.body;

    // Basic validation
    if (!username || !email_or_phone || !password) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Username, email, and password are required",
        });
    }

    // Check if user already exists
    const [existing] = await db.execute(
      "SELECT id FROM users WHERE username = ? OR email_or_phone = ?",
      [username, email_or_phone],
    );
    if (existing.length > 0) {
      return res
        .status(400)
        .json({
          success: false,
          message: "User with this username or email already exists",
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.execute(
      "INSERT INTO users (username, email_or_phone, password, role) VALUES (?, ?, ?, ?)",
      [username, email_or_phone, hashedPassword, role || "user"],
    );

    res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await db.execute("DELETE FROM users WHERE id = ?", [id]);
    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── Admin Role Management ──────────────────────────────────

exports.getAllAdmins = async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT id, username, email_or_phone, role, created_at FROM users WHERE role IN ('admin', 'super_admin') ORDER BY created_at DESC",
    );
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateAdminRole = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  if (req.user.role !== "super_admin") {
    return res
      .status(403)
      .json({
        success: false,
        message: "Only Super Admin can manage admin roles",
      });
  }

  try {
    await db.execute("UPDATE users SET role = ? WHERE id = ?", [role, id]);
    res.status(200).json({ success: true, message: "Admin role updated" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAuditLogs = async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT l.*, u.username as admin_username 
      FROM admin_audit_logs l
      JOIN users u ON l.admin_id = u.id 
      ORDER BY l.created_at DESC 
      LIMIT 100
    `);
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


/**
 * GET /api/admin/user/tree/list
 * Returns hierarchical user tree
 */
exports.getTreeList = async (req, res) => {
  try {
    const query = `
      SELECT 
        u.id as userIdx, 
        u.username as userID, 
        u.nickname, 
        u.role, 
        u.status,
        rf.referrer_id,
        (SELECT amount FROM user_balances WHERE user_id = u.id AND currency = 'KRW' LIMIT 1) as balance,
        (SELECT amount FROM user_balances WHERE user_id = u.id AND currency = 'POINT' LIMIT 1) as points,
        u.role as roleType,
        CASE WHEN u.role = 'user' THEN 1 ELSE 2 END as roleLevel,
        (SELECT COUNT(*) FROM referral_friends WHERE referrer_id = u.id) as child_count
      FROM users u
      LEFT JOIN referral_friends rf ON u.id = rf.friend_user_id
      ORDER BY u.id
    `;
    const [rows] = await db.execute(query);

    // Build the tree using a map for O(n) performance
    const userMap = {};
    const tree = [];

    rows.forEach((user) => {
      userMap[user.userIdx] = { 
        ...user, 
        roleType: user.role === 'user' ? 'member' : 'partner',
        roleLevel: user.role === 'user' ? 1 : 2,
        childBalance: 0,
        childPoints: 0,
        children: [] 
      };
    });

    rows.forEach((user) => {
      if (user.referrer_id && userMap[user.referrer_id]) {
        userMap[user.referrer_id].children.push(userMap[user.userIdx]);
      } else {
        tree.push(userMap[user.userIdx]);
      }
    });

    res.status(200).json({
      success: true,
      data: tree,
    });
  } catch (error) {
    console.error("Error fetching tree list:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

/**
 * GET /api/admin/user/login/list
 * Returns user login logs
 */
exports.getLoginLogs = async (req, res) => {
  try {
    const { page = 1, pageSize = 50, userID, startDate, endDate } = req.query;
    const limit = parseInt(pageSize, 10) || 50;
    const pageNum = parseInt(page, 10) || 1;
    const offset = (pageNum - 1) * limit;

    let whereClause = " WHERE 1=1";
    const params = [];

    if (userID && userID !== "") {
      whereClause += " AND u.username LIKE ?";
      params.push(`%${userID}%`);
    }

    if (startDate && startDate !== "" && endDate && endDate !== "") {
      whereClause += " AND DATE(ulh.created_at) BETWEEN ? AND ?";
      params.push(startDate, endDate);
    }

    const query = `
      SELECT 
        ulh.id,
        ulh.user_id,
        u.username,
        u.nickname,
        ulh.ip_address,
        ulh.device_info,
        ulh.created_at,
        ulh.created_at as last_login,
        ulh.created_at as page_accessed_at,
        '/' as current_url,
        '메인페이지' as current_page,
        IF(u.is_agent = 1 OR u.role = 'partner', 'partner', 'member') as roleType,
        IFNULL(u.agent_level, 1) as roleLevel,
        IFNULL(ub.amount, 0) as balance,
        0 as game_money
      FROM user_login_history ulh
      JOIN users u ON ulh.user_id = u.id
      LEFT JOIN user_balances ub ON u.id = ub.user_id AND ub.currency = 'KRW'
      ${whereClause}
      ORDER BY ulh.created_at DESC
      LIMIT ? OFFSET ?
    `;

    const [rows] = await db.query(query, [...params, limit, offset]);

    const countQuery = `
      SELECT COUNT(*) as total 
      FROM user_login_history ulh
      JOIN users u ON ulh.user_id = u.id
      ${whereClause}
    `;
    const [countRows] = await db.query(countQuery, params);

    res.status(200).json({
      success: true,
      data: rows,
      pagination: {
        total: countRows[0].total,
        page: pageNum,
        pageSize: limit,
        totalPages: Math.ceil(countRows[0].total / limit),
        hasMore: offset + limit < countRows[0].total,
      },
    });
  } catch (error) {
    console.error("Error in getLoginLogs:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * GET /api/admin/users/duplicate
 * Returns users with duplicate IP or bank info
 */
exports.getDuplicateUsers = async (req, res) => {
  try {
    const { page = 1, pageSize = 50, searchType = 'ip', searchText } = req.query;
    const limit = parseInt(pageSize, 10) || 50;
    const pageNum = parseInt(page, 10) || 1;
    const offset = (pageNum - 1) * limit;

    let whereClause = "WHERE 1=1";
    const params = [];

    if (searchText && searchText.trim() !== "") {
      if (searchType === 'ip') {
        whereClause += " AND u.last_ip_address LIKE ?";
        params.push(`%${searchText}%`);
      }
    } else {
      // If no search text, find all users who have at least one duplicate IP
      if (searchType === 'ip') {
        whereClause += " AND u.last_ip_address IN (SELECT last_ip_address FROM users WHERE last_ip_address IS NOT NULL AND last_ip_address != '' GROUP BY last_ip_address HAVING COUNT(*) > 1)";
      }
    }

    const query = `
      SELECT 
        u.id,
        u.id as userIdx,
        u.username as userID,
        u.nickname,
        u.status,
        u.last_ip_address as ipAddress,
        u.created_at as registerDate,
        u.last_login as lastLoginDate,
        u.role,
        IF(u.is_agent = 1 OR u.role = 'partner', 'partner', 'member') as roleType,
        IFNULL(u.agent_level, 1) as roleLevel,
        (SELECT amount FROM user_balances WHERE user_id = u.id AND currency = 'KRW' LIMIT 1) as money,
        (SELECT amount FROM user_balances WHERE user_id = u.id AND currency = 'POINT' LIMIT 1) as point,
        (SELECT SUM(amount) FROM wallet_transactions WHERE user_id = u.id AND type = 'deposit' AND status = 'completed') as totalCharge,
        (SELECT SUM(amount) FROM wallet_transactions WHERE user_id = u.id AND type = 'withdrawal' AND status = 'completed') as totalExchange,
        (SELECT username FROM users WHERE id = (SELECT referrer_id FROM referral_friends WHERE friend_user_id = u.id LIMIT 1)) as parentUsername,
        (SELECT referrer_id FROM referral_friends WHERE friend_user_id = u.id LIMIT 1) as parentId,
        '' as bankerName,
        '' as bankNumber,
        '' as domain,
        NULL as lastLogIdx
      FROM users u
      ${whereClause}
      ORDER BY u.last_ip_address, u.created_at DESC
      LIMIT ? OFFSET ?
    `;

    const [rows] = await db.query(query, [...params, limit, offset]);

    const countQuery = `
      SELECT COUNT(*) as total FROM users u ${whereClause}
    `;
    const [countRows] = await db.query(countQuery, params);

    const data = rows.map(r => ({
      ...r,
      totalInout: (r.totalCharge || 0) - (r.totalExchange || 0)
    }));

    res.status(200).json({
      success: true,
      data,
      pagination: {
        total: countRows[0].total,
        page: pageNum,
        pageSize: limit,
        totalPages: Math.ceil(countRows[0].total / limit)
      }
    });
  } catch (error) {
    console.error("Error in getDuplicateUsers:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getUserEditLogs = async (req, res) => {
  try {
    const {
      page = 1,
      pageSize = 50,
      startDate,
      endDate,
      searchType,
      searchText,
    } = req.query;
    const limit = parseInt(pageSize, 10) || 50;
    const pageNum = parseInt(page, 10) || 1;
    const offset = (pageNum - 1) * limit;

    let whereClause = "WHERE 1=1";
    const params = [];

    if (startDate) {
      whereClause += " AND uel.updated_at >= ?";
      params.push(`${startDate} 00:00:00`);
    }
    if (endDate) {
      whereClause += " AND uel.updated_at <= ?";
      params.push(`${endDate} 23:59:59`);
    }

    if (searchType && searchText) {
      if (searchType === "id") {
        whereClause += " AND u.username LIKE ?";
        params.push(`%${searchText}%`);
      } else if (searchType === "col") {
        whereClause += " AND uel.change_item LIKE ?";
        params.push(`%${searchText}%`);
      } else if (searchType === "nick") {
        whereClause += " AND u.nickname LIKE ?";
        params.push(`%${searchText}%`);
      } else if (searchType === "ip") {
        whereClause += " AND uel.ip_address LIKE ?";
        params.push(`%${searchText}%`);
      } else if (searchType === "register") {
        whereClause += " AND p.username LIKE ?";
        params.push(`%${searchText}%`);
      }
    }

    const query = `
      SELECT 
        uel.*,
        u.username as user_id_display,
        u.nickname,
        IF(u.is_agent = 1 OR u.role = 'partner', 'partner', 'member') as roleType,
        IFNULL(u.agent_level, 1) as roleLevel,
        p.username as processor_name
      FROM user_edit_logs uel
      JOIN users u ON uel.user_id = u.id
      LEFT JOIN users p ON uel.processor_id = p.id
      ${whereClause}
      ORDER BY uel.updated_at DESC
      LIMIT ? OFFSET ?
    `;

    const [rows] = await db.query(query, [...params, limit, offset]);

    const countQuery = `
      SELECT COUNT(*) as total 
      FROM user_edit_logs uel
      JOIN users u ON uel.user_id = u.id
      LEFT JOIN users p ON uel.processor_id = p.id
      ${whereClause}
    `;
    const [countRows] = await db.query(countQuery, params);

    res.status(200).json({
      success: true,
      data: rows,
      pagination: {
        total: countRows[0].total,
        page: pageNum,
        pageSize: limit,
        totalPages: Math.ceil(countRows[0].total / limit),
        hasMore: offset + limit < countRows[0].total,
      },
    });
  } catch (error) {
    console.error("Error in getUserEditLogs:", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.getUserDetail = async (req, res) => {
  try {
    const { userIdx } = req.query;
    if (!userIdx) return res.status(400).json({ success: false, message: "userIdx is required" });

    const query = `
      SELECT 
        u.id as userIdx,
        u.username as id,
        u.nickname,
        u.role,
        u.status,
        u.last_login,
        u.last_ip_address,
        u.created_at,
        u.vip_level_id as level,
        u.admin_notes as memo,
        u.referral_code as recommendCode,
        u.kyc_status,
        u.is_muted,
        (SELECT username FROM users WHERE id = (SELECT referrer_id FROM referral_friends WHERE friend_user_id = u.id LIMIT 1)) as parentUser,
        (SELECT referrer_id FROM referral_friends WHERE friend_user_id = u.id LIMIT 1) as parentUserIdx,
        (SELECT IFNULL(amount, 0) FROM user_balances WHERE user_id = u.id AND currency = 'KRW' LIMIT 1) as money,
        (SELECT IFNULL(amount, 0) FROM user_balances WHERE user_id = u.id AND currency = 'CASINO' LIMIT 1) as casinoMoney,
        (SELECT IFNULL(amount, 0) FROM user_balances WHERE user_id = u.id AND currency = 'POINT' LIMIT 1) as point,
        (SELECT IFNULL(SUM(amount), 0) FROM wallet_transactions WHERE user_id = u.id AND type = 'deposit' AND status = 'completed') as totalCharge,
        (SELECT IFNULL(SUM(amount), 0) FROM wallet_transactions WHERE user_id = u.id AND type = 'withdrawal' AND status = 'completed') as totalExchange,
        (SELECT IFNULL(SUM(bet_money), 0) FROM casino_bet_orders WHERE user_id = u.id) as totalBetting,
        (SELECT IFNULL(SUM(win_money), 0) FROM casino_bet_orders WHERE user_id = u.id) as totalWin,
        (SELECT IFNULL(SUM(amount), 0) FROM point_logs WHERE user_id = u.id) as totalEvent
      FROM users u
      WHERE u.id = ?
    `;

    const [rows] = await db.query(query, [userIdx]);

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const userData = rows[0];
    userData.chargeProfit = (Number(userData.totalCharge) || 0) - (Number(userData.totalExchange) || 0);

    res.status(200).json({ success: true, data: userData });
  } catch (error) {
    console.error("Error in getUserDetail:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
