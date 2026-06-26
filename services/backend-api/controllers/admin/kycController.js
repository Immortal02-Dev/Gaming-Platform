const db = require("../../config/db");

exports.getAllSubmissions = async (req, res) => {
  try {
    const { status } = req.query;
    let query = `
      SELECT ks.*, u.username, u.email 
      FROM kyc_submissions ks
      JOIN users u ON ks.user_id = u.id
    `;
    const params = [];

    if (status) {
      query += " WHERE ks.status = ?";
      params.push(status);
    }

    query += " ORDER BY ks.submitted_at DESC";

    const [rows] = await db.execute(query, params);
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, rejection_reason } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    await db.execute(
      "UPDATE kyc_submissions SET status = ?, rejection_reason = ?, processed_at = CURRENT_TIMESTAMP WHERE id = ?",
      [status, rejection_reason || null, id]
    );

    // If approved, update user's kyc_status (assuming it exists in users table)
    if (status === "approved") {
      const [[sub]] = await db.execute("SELECT user_id FROM kyc_submissions WHERE id = ?", [id]);
      if (sub) {
        await db.execute("UPDATE users SET kyc_status = 'verified' WHERE id = ?", [sub.user_id]);
      }
    }

    res.status(200).json({ success: true, message: `KYC ${status}` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
