const db = require("../../config/db");

/**
 * GET /api/admin/responsible/exclusions
 * List all self-exclusions and cooldowns with pagination and search
 */
exports.getAllExclusions = async (req, res) => {
  try {
    const {
      page = 1,
      pageSize = 20,
      searchType,
      searchText,
      type // 'cooldown' or 'exclusion'
    } = req.query;

    const limit = parseInt(pageSize, 10) || 20;
    const pageNum = parseInt(page, 10) || 1;
    const offset = (pageNum - 1) * limit;

    let whereClause = "WHERE 1=1";
    const params = [];

    if (type) {
      whereClause += " AND use.type = ?";
      params.push(type);
    }

    if (searchType && searchText && searchText.trim() !== "") {
      if (searchType === "id") {
        whereClause += " AND u.username LIKE ?";
        params.push(`%${searchText}%`);
      } else if (searchType === "nick") {
        whereClause += " AND u.nickname LIKE ?";
        params.push(`%${searchText}%`);
      } else if (searchType === "reason") {
        whereClause += " AND use.reason LIKE ?";
        params.push(`%${searchText}%`);
      }
    }

    const query = `
      SELECT 
        use.*, 
        u.username, 
        u.nickname,
        u.email 
      FROM user_self_exclusion use
      JOIN users u ON use.user_id = u.id
      ${whereClause}
      ORDER BY use.created_at DESC
      LIMIT ? OFFSET ?
    `;

    const [rows] = await db.query(query, [...params, limit, offset]);

    const countQuery = `
      SELECT COUNT(*) as total 
      FROM user_self_exclusion use
      JOIN users u ON use.user_id = u.id 
      ${whereClause}
    `;
    const [[{ total }]] = await db.query(countQuery, params);

    res.status(200).json({ 
      success: true, 
      data: rows,
      pagination: {
        total,
        page: pageNum,
        pageSize: limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Error in getAllExclusions:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * DELETE /api/admin/responsible/exclusions/:id
 * Effectively cancel an exclusion by setting its end_date to now
 */
exports.cancelExclusion = async (req, res) => {
  try {
    const { id } = req.params;
    await db.execute(
      "UPDATE user_self_exclusion SET end_date = CURRENT_TIMESTAMP WHERE id = ?",
      [id]
    );
    res.status(200).json({ success: true, message: "제한 조치가 해제되었습니다." });
  } catch (error) {
    console.error("Error in cancelExclusion:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * GET /api/admin/responsible/limits
 * List all user gambling limits
 */
exports.getAllLimits = async (req, res) => {
  try {
    const {
      page = 1,
      pageSize = 20,
      searchType,
      searchText
    } = req.query;

    const limit = parseInt(pageSize, 10) || 20;
    const pageNum = parseInt(page, 10) || 1;
    const offset = (pageNum - 1) * limit;

    let whereClause = "WHERE 1=1";
    const params = [];

    if (searchType && searchText && searchText.trim() !== "") {
      if (searchType === "id") {
        whereClause += " AND u.username LIKE ?";
        params.push(`%${searchText}%`);
      } else if (searchType === "nick") {
        whereClause += " AND u.nickname LIKE ?";
        params.push(`%${searchText}%`);
      }
    }

    const query = `
      SELECT 
        ugl.*, 
        u.username, 
        u.nickname
      FROM user_gambling_limits ugl
      JOIN users u ON ugl.user_id = u.id
      ${whereClause}
      ORDER BY ugl.updated_at DESC
      LIMIT ? OFFSET ?
    `;

    const [rows] = await db.query(query, [...params, limit, offset]);

    const countQuery = `
      SELECT COUNT(*) as total 
      FROM user_gambling_limits ugl
      JOIN users u ON ugl.user_id = u.id 
      ${whereClause}
    `;
    const [[{ total }]] = await db.query(countQuery, params);

    res.status(200).json({ 
      success: true, 
      data: rows,
      pagination: {
        total,
        page: pageNum,
        pageSize: limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error("Error in getAllLimits:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
