const db = require("../../config/db");

// GET /api/admin/guides
exports.getAllGuides = async (req, res) => {
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
      } else if (searchType === "category") {
        whereClause += " AND category LIKE ?";
        params.push(`%${searchText}%`);
      } else {
        whereClause += " AND (title LIKE ? OR category LIKE ?)";
        params.push(`%${searchText}%`, `%${searchText}%`);
      }
    }

    if (active === "true") {
      whereClause += " AND is_active = 1";
    } else if (active === "false") {
      whereClause += " AND is_active = 0";
    }

    const [[{ total }]] = await db.execute(
      `SELECT COUNT(*) as total FROM guides ${whereClause}`,
      params
    );

    const [items] = await db.execute(
      `SELECT id, category, title, content, is_active as isActive, display_order as displayOrder, created_at as createdAt, updated_at as updatedAt 
       FROM guides ${whereClause} 
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
    console.error("Fetch guides error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/admin/guides
exports.createGuide = async (req, res) => {
  const { category, title, content, isActive, displayOrder } = req.body;
  try {
    const [result] = await db.execute(
      "INSERT INTO guides (category, title, content, is_active, display_order) VALUES (?, ?, ?, ?, ?)",
      [category, title, content, isActive ? 1 : 0, displayOrder || 0]
    );
    res.json({ success: true, id: result.insertId });
  } catch (error) {
    console.error("Create guide error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/admin/guides/:id
exports.updateGuide = async (req, res) => {
  const { id } = req.params;
  const { category, title, content, isActive, displayOrder } = req.body;
  try {
    await db.execute(
      "UPDATE guides SET category = ?, title = ?, content = ?, is_active = ?, display_order = ? WHERE id = ?",
      [category, title, content, isActive ? 1 : 0, displayOrder || 0, id]
    );
    res.json({ success: true });
  } catch (error) {
    console.error("Update guide error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/admin/guides/:id
exports.deleteGuide = async (req, res) => {
  const { id } = req.params;
  try {
    await db.execute("DELETE FROM guides WHERE id = ?", [id]);
    res.json({ success: true });
  } catch (error) {
    console.error("Delete guide error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/admin/guides/:id/active
exports.toggleActive = async (req, res) => {
  const { id } = req.params;
  const { isActive } = req.body;
  try {
    await db.execute("UPDATE guides SET is_active = ? WHERE id = ?", [isActive ? 1 : 0, id]);
    res.json({ success: true });
  } catch (error) {
    console.error("Toggle active error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/admin/guides/:id/order
exports.updateOrder = async (req, res) => {
  const { id } = req.params;
  const { displayOrder } = req.body;
  try {
    await db.execute("UPDATE guides SET display_order = ? WHERE id = ?", [displayOrder, id]);
    res.json({ success: true });
  } catch (error) {
    console.error("Update order error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
