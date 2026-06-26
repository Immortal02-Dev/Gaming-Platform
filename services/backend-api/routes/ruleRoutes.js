const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET /api/rules
// Public endpoint to fetch active rules
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, category, title, content, display_order as displayOrder FROM rules WHERE is_active = 1 ORDER BY display_order ASC, created_at DESC"
    );
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error("Public fetch rules error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
