const express = require("express");
const router = express.Router();
const db = require("../config/db");

// GET /api/guides
// Public endpoint to fetch active guides
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, category, title, content, display_order as displayOrder FROM guides WHERE is_active = 1 ORDER BY display_order ASC, created_at DESC"
    );
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error("Public fetch guides error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
