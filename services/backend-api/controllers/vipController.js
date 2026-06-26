const db = require("../config/db");

// ─────────────────────────────────────────────
// GET /api/vip
// ─────────────────────────────────────────────
exports.getVipInfo = async (req, res) => {
  try {
    const [levels] = await db.execute("SELECT * FROM vip_levels ORDER BY id ASC");
    const [benefits] = await db.execute("SELECT * FROM vip_benefits ORDER BY display_order ASC");
    
    res.status(200).json({ 
      success: true, 
      data: {
        levels,
        benefits
      } 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching VIP info" });
  }
};

// ─────────────────────────────────────────────
// GET /api/vip/benefits
// ─────────────────────────────────────────────
exports.getVipBenefits = async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM vip_benefits ORDER BY display_order ASC"
    );
    res.status(200).json({ data: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching VIP benefits" });
  }
};

// ─────────────────────────────────────────────
// GET /api/vip/faqs
// ─────────────────────────────────────────────
exports.getVipFaqs = async (req, res) => {
  try {
    const { category } = req.query;
    
    let query = "SELECT * FROM vip_faqs";
    const params = [];
    
    if (category) {
      query += " WHERE category = ?";
      params.push(category);
    }
    
    query += " ORDER BY display_order ASC";
    
    const [rows] = await db.execute(query, params);
    res.status(200).json({ data: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching VIP FAQs" });
  }
};
