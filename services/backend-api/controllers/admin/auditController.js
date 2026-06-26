const db = require("../../config/db");

exports.getAllLogs = async (req, res) => {
  try {
    const { admin_username, target_type } = req.query;
    let query = "SELECT * FROM admin_audit_logs WHERE 1=1";
    const params = [];

    if (admin_username) {
      query += " AND admin_username LIKE ?";
      params.push(`%${admin_username}%`);
    }

    if (target_type) {
      query += " AND target_type = ?";
      params.push(target_type);
    }

    query += " ORDER BY created_at DESC LIMIT 100";

    const [rows] = await db.execute(query, params);
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Helper function to log actions (can be used in other controllers)
exports.logAction = async (admin, action, target_type, target_id, details, ip) => {
  try {
    await db.execute(
      "INSERT INTO admin_audit_logs (admin_id, admin_username, action, target_type, target_id, details, ip_address) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [admin.id, admin.username, action, target_type, String(target_id), JSON.stringify(details), ip]
    );
  } catch (error) {
    console.error("Audit log failed", error);
  }
};
