const db = require("../../config/db");

// GET /api/admin/messages/templates
exports.getAllTemplates = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT id, template_name as templateName, subject, content, created_by as createdBy, is_active as isActive, usage_count as usageCount, created_at as createdAt FROM message_templates ORDER BY id DESC"
    );
    res.json({ success: true, data: rows });
  } catch (error) {
    console.error("Fetch templates error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/admin/messages/templates/:id
exports.getTemplateById = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query(
      "SELECT id, template_name as templateName, subject, content, created_by as createdBy, is_active as isActive, usage_count as usageCount, created_at as createdAt FROM message_templates WHERE id = ?",
      [id]
    );
    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "Template not found" });
    }
    res.json({ success: true, data: rows[0] });
  } catch (error) {
    console.error("Get template error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/admin/messages/templates
exports.createTemplate = async (req, res) => {
  const { templateName, subject, content, isActive } = req.body;
  
  try {
    // Try to find managerIdx from username if not in req.user
    let createdBy = req.user?.managerIdx;
    if (!createdBy && req.user?.username) {
      const [managers] = await db.execute("SELECT managerIdx FROM admin_managers WHERE userId = ?", [req.user.username]);
      if (managers.length > 0) {
        createdBy = managers[0].managerIdx;
      }
    }

    const [result] = await db.execute(
      "INSERT INTO message_templates (template_name, subject, content, is_active, created_by) VALUES (?, ?, ?, ?, ?)",
      [templateName, subject, content, (isActive === undefined || isActive === true) ? 1 : 0, createdBy || null]
    );
    res.json({ success: true, id: result.insertId });
  } catch (error) {
    console.error("Create template error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/admin/messages/templates/:id
exports.updateTemplate = async (req, res) => {
  const { id } = req.params;
  const { templateName, subject, content, isActive } = req.body;
  try {
    await db.execute(
      "UPDATE message_templates SET template_name = ?, subject = ?, content = ?, is_active = ? WHERE id = ?",
      [templateName, subject, content, (isActive === false) ? 0 : 1, id]
    );
    res.json({ success: true });
  } catch (error) {
    console.error("Update template error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/admin/messages/templates/:id
exports.deleteTemplate = async (req, res) => {
  const { id } = req.params;
  try {
    await db.execute("DELETE FROM message_templates WHERE id = ?", [id]);
    res.json({ success: true });
  } catch (error) {
    console.error("Delete template error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
