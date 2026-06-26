const db = require("../../config/db");
const bcrypt = require("bcryptjs");

// ── Admin IP Management ────────────────────────────────────────────────────────

/**
 * GET /api/admin/manager-setting/ips
 * List all allowed admin IPs
 */
exports.getAdminIPs = async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT adminIPIdx, adminIP, memo FROM admin_ips ORDER BY adminIPIdx ASC"
    );
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    console.error("getAdminIPs Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * POST /api/admin/manager-setting/ips
 * Add a new allowed admin IP
 */
exports.addAdminIP = async (req, res) => {
  try {
    const { adminIP, memo } = req.body;
    if (!adminIP) {
      return res
        .status(400)
        .json({ success: false, message: "IP 주소는 필수입니다." });
    }

    // Check for duplicate IP
    const [existing] = await db.execute(
      "SELECT adminIPIdx FROM admin_ips WHERE adminIP = ?",
      [adminIP]
    );
    if (existing.length > 0) {
      return res
        .status(400)
        .json({ success: false, message: "이미 등록된 IP 주소입니다." });
    }

    await db.execute(
      "INSERT INTO admin_ips (adminIP, memo) VALUES (?, ?)",
      [adminIP, memo || ""]
    );
    res
      .status(201)
      .json({ success: true, message: "IP 주소가 등록되었습니다." });
  } catch (error) {
    console.error("addAdminIP Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * DELETE /api/admin/manager-setting/ips/:adminIPIdx
 * Delete an admin IP entry
 */
exports.deleteAdminIP = async (req, res) => {
  try {
    const { adminIPIdx } = req.params;
    const [result] = await db.execute(
      "DELETE FROM admin_ips WHERE adminIPIdx = ?",
      [adminIPIdx]
    );
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ success: false, message: "IP를 찾을 수 없습니다." });
    }
    res.status(200).json({ success: true, message: "IP가 삭제되었습니다." });
  } catch (error) {
    console.error("deleteAdminIP Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── Manager Management ─────────────────────────────────────────────────────────

/**
 * GET /api/admin/manager-setting/managers
 * List all managers (summary view)
 */
exports.getManagers = async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT
        m.managerIdx,
        registrar.username AS registerUserId,
        registrar.nickname AS registerUserNickName,
        m.userId,
        m.nickName,
        m.userRoleIdx,
        m.userStatusIdx,
        m.memo,
        DATE_FORMAT(m.registerDate, '%Y-%m-%d %H:%i:%s') AS registerDate
      FROM admin_managers m
      LEFT JOIN users registrar ON m.registerUserIdx = registrar.id
      ORDER BY m.managerIdx ASC
    `);
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    console.error("getManagers Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * GET /api/admin/manager-setting/managers/:managerIdx
 * Get a single manager with full details including permissions
 */
exports.getManagerDetail = async (req, res) => {
  try {
    const { managerIdx } = req.params;

    const [rows] = await db.execute(
      `SELECT
        m.managerIdx,
        m.userId,
        m.nickName,
        m.userRoleIdx,
        m.userStatusIdx,
        m.allowLiveInfo,
        m.allowAlarmCount,
        m.allowDashboard,
        m.memo,
        DATE_FORMAT(m.registerDate, '%Y-%m-%d %H:%i:%s') AS registerDate
      FROM admin_managers m
      WHERE m.managerIdx = ?`,
      [managerIdx]
    );

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "관리자를 찾을 수 없습니다." });
    }

    const manager = rows[0];

    // Fetch permissions
    const [perms] = await db.execute(
      "SELECT permissionId, readYN, writeYN FROM admin_manager_permissions WHERE managerIdx = ?",
      [managerIdx]
    );

    const readYN = {};
    const writeYN = {};
    perms.forEach((p) => {
      readYN[p.permissionId] = p.readYN === 1;
      writeYN[p.permissionId] = p.writeYN === 1;
    });

    res.status(200).json({
      success: true,
      data: {
        ...manager,
        permissions: { readYN, writeYN },
      },
    });
  } catch (error) {
    console.error("getManagerDetail Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * POST /api/admin/manager-setting/check-credentials
 * Check if userId and nickName are available (not already taken)
 */
exports.checkCredentials = async (req, res) => {
  try {
    const { userID, nickName } = req.body;

    if (!userID || !nickName) {
      return res
        .status(400)
        .json({ ReturnCode: 1, ReturnMessage: "아이디와 닉네임은 필수입니다." });
    }

    const [idCheck] = await db.execute(
      "SELECT managerIdx FROM admin_managers WHERE userId = ?",
      [userID]
    );
    if (idCheck.length > 0) {
      return res
        .status(200)
        .json({ ReturnCode: 1, ReturnMessage: "이미 사용 중인 아이디입니다." });
    }

    const [nickCheck] = await db.execute(
      "SELECT managerIdx FROM admin_managers WHERE nickName = ?",
      [nickName]
    );
    if (nickCheck.length > 0) {
      return res
        .status(200)
        .json({ ReturnCode: 1, ReturnMessage: "이미 사용 중인 닉네임입니다." });
    }

    res.status(200).json({ ReturnCode: 0, ReturnMessage: "사용 가능합니다." });
  } catch (error) {
    console.error("checkCredentials Error:", error);
    res.status(500).json({ ReturnCode: 1, ReturnMessage: error.message });
  }
};

/**
 * POST /api/admin/manager-setting/managers
 * Create a new manager
 */
exports.createManager = async (req, res) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    const {
      userID,
      password,
      nickName,
      userStatusIdx,
      adminLiveInfoAuth,
      adminAlarmCountAuth,
      adminDashboardAuth,
      memo,
      readYN,
      writeYN,
    } = req.body;

    if (!userID || !password || !nickName) {
      await connection.rollback();
      return res
        .status(400)
        .json({ success: false, message: "아이디, 비밀번호, 닉네임은 필수입니다." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const registerUserIdx = req.user?.id || null;
    const allowLiveInfo = adminLiveInfoAuth === "1" ? 0 : 1;
    const allowAlarmCount = adminAlarmCountAuth === "1" ? 0 : 1;
    const allowDashboard = adminDashboardAuth === "1" ? 0 : 1;

    const [result] = await connection.execute(
      `INSERT INTO admin_managers
        (userId, password, nickName, userRoleIdx, userStatusIdx,
         allowLiveInfo, allowAlarmCount, allowDashboard, memo, registerUserIdx, registerDate)
       VALUES (?, ?, ?, 2, ?, ?, ?, ?, ?, ?, NOW())`,
      [
        userID,
        hashedPassword,
        nickName,
        parseInt(userStatusIdx, 10) || 2,
        allowLiveInfo,
        allowAlarmCount,
        allowDashboard,
        memo || "",
        registerUserIdx,
      ]
    );

    const newManagerIdx = result.insertId;

    // Upsert permissions
    if (readYN || writeYN) {
      const allIds = new Set([
        ...Object.keys(readYN || {}),
        ...Object.keys(writeYN || {}),
      ]);
      for (const permId of allIds) {
        const r = readYN?.[permId] ? 1 : 0;
        const w = writeYN?.[permId] ? 1 : 0;
        await connection.execute(
          `INSERT INTO admin_manager_permissions (managerIdx, permissionId, readYN, writeYN)
           VALUES (?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE readYN = VALUES(readYN), writeYN = VALUES(writeYN)`,
          [newManagerIdx, parseInt(permId, 10), r, w]
        );
      }
    }

    await connection.commit();
    res
      .status(201)
      .json({ success: true, message: "관리자가 등록되었습니다." });
  } catch (error) {
    await connection.rollback();
    console.error("createManager Error:", error);
    res.status(500).json({ success: false, message: error.message });
  } finally {
    connection.release();
  }
};

/**
 * PUT /api/admin/manager-setting/managers/:managerIdx
 * Update an existing manager
 */
exports.updateManager = async (req, res) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    const { managerIdx } = req.params;
    const {
      password,
      userStatusIdx,
      adminLiveInfoAuth,
      adminAlarmCountAuth,
      adminDashboardAuth,
      memo,
      readYN,
      writeYN,
    } = req.body;

    const updates = [];
    const params = [];

    if (password && password.trim() !== "") {
      const hashedPassword = await bcrypt.hash(password, 10);
      updates.push("password = ?");
      params.push(hashedPassword);
    }
    if (userStatusIdx !== undefined) {
      updates.push("userStatusIdx = ?");
      params.push(parseInt(userStatusIdx, 10));
    }
    if (adminLiveInfoAuth !== undefined) {
      updates.push("allowLiveInfo = ?");
      params.push(adminLiveInfoAuth === "1" ? 0 : 1);
    }
    if (adminAlarmCountAuth !== undefined) {
      updates.push("allowAlarmCount = ?");
      params.push(adminAlarmCountAuth === "1" ? 0 : 1);
    }
    if (adminDashboardAuth !== undefined) {
      updates.push("allowDashboard = ?");
      params.push(adminDashboardAuth === "1" ? 0 : 1);
    }
    if (memo !== undefined) {
      updates.push("memo = ?");
      params.push(memo);
    }

    if (updates.length > 0) {
      params.push(managerIdx);
      await connection.execute(
        `UPDATE admin_managers SET ${updates.join(", ")} WHERE managerIdx = ?`,
        params
      );
    }

    // Upsert permissions
    if (readYN || writeYN) {
      const allIds = new Set([
        ...Object.keys(readYN || {}),
        ...Object.keys(writeYN || {}),
      ]);
      for (const permId of allIds) {
        const r = readYN?.[permId] ? 1 : 0;
        const w = writeYN?.[permId] ? 1 : 0;
        await connection.execute(
          `INSERT INTO admin_manager_permissions (managerIdx, permissionId, readYN, writeYN)
           VALUES (?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE readYN = VALUES(readYN), writeYN = VALUES(writeYN)`,
          [parseInt(managerIdx, 10), parseInt(permId, 10), r, w]
        );
      }
    }

    await connection.commit();
    res
      .status(200)
      .json({ success: true, message: "관리자 정보가 수정되었습니다." });
  } catch (error) {
    await connection.rollback();
    console.error("updateManager Error:", error);
    res.status(500).json({ success: false, message: error.message });
  } finally {
    connection.release();
  }
};
