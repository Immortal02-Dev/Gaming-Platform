const db = require("../../config/db");

/**
 * GET /api/admin/sport-setting
 * List sports for administration
 */
exports.getSportSettings = async (req, res) => {
  try {
    const {
      page = 1,
      pageSize = 10,
      searchType,
      searchText,
      sortField = "sortOrder",
      sortOrder = "asc",
    } = req.query;

    const limit = parseInt(pageSize, 10) || 10;
    const pageNum = parseInt(page, 10) || 1;
    const offset = Math.max(0, (pageNum - 1) * limit);

    let whereClause = "WHERE 1=1";
    const params = [];

    if (searchType && searchText && searchText.trim() !== "") {
      if (searchType === "1") {
        // 원본 종목명
        whereClause += " AND name LIKE ?";
        params.push(`%${searchText}%`);
      } else if (searchType === "2") {
        // 노출명
        whereClause += " AND display_name LIKE ?";
        params.push(`%${searchText}%`);
      } else {
        // 전체
        whereClause += " AND (name LIKE ? OR display_name LIKE ?)";
        params.push(`%${searchText}%`, `%${searchText}%`);
      }
    }

    // Sort mapping
    const sortMap = {
      sort: "order_index",
      sportName: "name",
      displayName: "display_name",
      updatedAt: "updated_at",
    };
    const orderByField = sortMap[sortField] || "order_index";
    const orderByOrder = sortOrder.toLowerCase() === "desc" ? "DESC" : "ASC";

    const query = `
      SELECT
        id AS sportIdx,
        name AS sportName,
        display_name AS displayName,
        order_index AS sortOrder,
        is_active AS useYN,
        deadline_seconds AS deadlineSeconds,
        image_url AS imageUrl,
        'Admin' AS updateUserName, -- Mock until we have a real updated_by relation
        updated_at AS updatedAt
      FROM sports
      ${whereClause}
      ORDER BY ${orderByField} ${orderByOrder}
      LIMIT ? OFFSET ?
    `;

    const [rows] = await db.query(query, [...params, limit, offset]);

    const countQuery = `SELECT COUNT(*) AS total FROM sports ${whereClause}`;
    const [countRows] = await db.query(countQuery, params);
    const total = countRows[0].total;

    // Add row number (no) for frontend
    const items = rows.map((r, i) => ({
      ...r,
      no: total - offset - i,
      useYN: Number(r.useYN),
    }));

    res.status(200).json({
      ReturnCode: 0,
      ReturnMessage: "Success",
      data: {
        items,
        pagination: {
          total,
          page: parseInt(page, 10),
          pageSize: limit,
          totalPages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error("Error in getSportSettings:", error);
    res.status(500).json({ ReturnCode: 1, ReturnMessage: error.message });
  }
};

/**
 * POST /api/admin/sport-setting/:id
 * Update a sport setting
 */
exports.updateSportSetting = async (req, res) => {
  try {
    const { id } = req.params;
    const { displayName, useYN, sortOrder, deadlineSeconds, imageUrl } = req.body;

    const query = `
      UPDATE sports
      SET 
        display_name = ?,
        is_active = ?,
        order_index = ?,
        deadline_seconds = ?,
        image_url = ?
      WHERE id = ?
    `;

    await db.execute(query, [
      displayName || "",
      parseInt(useYN, 10) || 0,
      parseInt(sortOrder, 10) || 0,
      parseInt(deadlineSeconds, 10) || 0,
      imageUrl,
      id
    ]);

    res.status(200).json({
      ReturnCode: 0,
      ReturnMessage: "수정되었습니다.",
    });
  } catch (error) {
    console.error("Error in updateSportSetting:", error);
    res.status(500).json({ ReturnCode: 1, ReturnMessage: error.message });
  }
};
