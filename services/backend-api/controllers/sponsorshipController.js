const db = require("../config/db");

exports.getSponsorships = async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM sponsorships ORDER BY created_at DESC");
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getSponsorshipBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const [rows] = await db.execute("SELECT * FROM sponsorships WHERE slug = ?", [slug]);
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "Sponsorship not found" });
    }
    res.status(200).json({ success: true, data: rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
