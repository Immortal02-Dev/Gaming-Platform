const db = require("../../config/db");

// GET /api/admin/rules
exports.getAllRules = async (req, res) => {
  const { page = 1, pageSize = 20, searchType, searchText, active } = req.query;
  const offset = (parseInt(page) - 1) * parseInt(pageSize);
  const limit = parseInt(pageSize);

  try {
    let whereClause = "WHERE 1=1";
    const params = [];

    if (searchText && searchText.trim()) {
      if (searchType === "title") {
        whereClause += " AND title LIKE ?";
        params.push(`%${searchText}%`);
      } else if (searchType === "content") {
        whereClause += " AND content LIKE ?";
        params.push(`%${searchText}%`);
      } else {
        whereClause += " AND (title LIKE ? OR content LIKE ?)";
        params.push(`%${searchText}%`, `%${searchText}%`);
      }
    }

    if (active === "true") {
      whereClause += " AND is_active = 1";
    } else if (active === "false") {
      whereClause += " AND is_active = 0";
    }

    const [[{ total }]] = await db.execute(
      `SELECT COUNT(*) as total FROM rules ${whereClause}`,
      params
    );

    const [items] = await db.execute(
      `SELECT id, category, title, content, is_active as isActive, display_order as displayOrder, created_at as createdAt, updated_at as updatedAt 
       FROM rules ${whereClause} 
       ORDER BY display_order ASC, created_at DESC 
       LIMIT ? OFFSET ?`,
      [...params, limit, offset]
    );

    res.json({
      total,
      page: parseInt(page),
      pageSize: limit,
      totalPages: Math.ceil(total / limit),
      items
    });
  } catch (error) {
    console.error("Fetch rules error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/admin/rules
exports.createRule = async (req, res) => {
  const { category, title, content, isActive, displayOrder } = req.body;
  try {
    const [result] = await db.execute(
      "INSERT INTO rules (category, title, content, is_active, display_order) VALUES (?, ?, ?, ?, ?)",
      [category, title, content, isActive ? 1 : 0, displayOrder || 0]
    );
    res.json({ success: true, id: result.insertId });
  } catch (error) {
    console.error("Create rule error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/admin/rules/:id
exports.updateRule = async (req, res) => {
  const { id } = req.params;
  const { category, title, content, isActive, displayOrder } = req.body;
  try {
    await db.execute(
      "UPDATE rules SET category = ?, title = ?, content = ?, is_active = ?, display_order = ? WHERE id = ?",
      [category, title, content, isActive ? 1 : 0, displayOrder || 0, id]
    );
    res.json({ success: true });
  } catch (error) {
    console.error("Update rule error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/admin/rules/:id
exports.deleteRule = async (req, res) => {
  const { id } = req.params;
  try {
    await db.execute("DELETE FROM rules WHERE id = ?", [id]);
    res.json({ success: true });
  } catch (error) {
    console.error("Delete rule error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/admin/rules/:id/active
exports.toggleActive = async (req, res) => {
  const { id } = req.params;
  const { isActive } = req.body;
  try {
    await db.execute("UPDATE rules SET is_active = ? WHERE id = ?", [isActive ? 1 : 0, id]);
    res.json({ success: true });
  } catch (error) {
    console.error("Toggle active error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/admin/rules/:id/order
exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  const { displayOrder } = req.body;
  try {
    await db.execute("UPDATE rules SET display_order = ? WHERE id = ?", [displayOrder, id]);
    res.json({ success: true });
  } catch (error) {
    console.error("Update order error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
