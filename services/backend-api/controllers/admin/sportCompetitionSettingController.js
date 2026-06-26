const db = require("../../config/db");

/**
 * GET /api/admin/sport-competition-setting
 * List competitions for administration
 */
exports.getSportCompetitionSettings = async (req, res) => {
  try {
    const {
      regionIdx,
      sportIdx,
      searchType,
      searchText,
      page = 1,
      pageSize = 200,
    } = req.query;

    const limit = parseInt(pageSize, 10) || 200;
    const pageNum = parseInt(page, 10) || 1;
    const offset = Math.max(0, (pageNum - 1) * limit);

    let whereClause = "WHERE 1=1";
    const params = [];

    if (regionIdx && regionIdx !== "") {
      whereClause += " AND l.region_id = ?";
      params.push(parseInt(regionIdx, 10));
    }

    if (sportIdx && sportIdx !== "") {
      whereClause += " AND l.sport_id = ?";
      params.push(parseInt(sportIdx, 10));
    }

    if (searchType && searchText && searchText.trim() !== "") {
      if (searchType === "1") {
        // 원본 리그명
        whereClause += " AND l.name LIKE ?";
        params.push(`%${searchText}%`);
      } else if (searchType === "2") {
        // 노출명
        whereClause += " AND l.display_name LIKE ?";
        params.push(`%${searchText}%`);
      } else {
        // 전체
        whereClause += " AND (l.name LIKE ? OR l.display_name LIKE ?)";
        params.push(`%${searchText}%`, `%${searchText}%`);
      }
    }

    const query = `
      SELECT
        l.id AS competitionIdx,
        l.region_id AS regionIdx,
        l.region AS regionName,
        l.sport_id AS sportIdx,
        s.name AS sportName,
        l.name AS competitionName,
        l.display_name AS displayName,
        l.logo AS imageUrl,
        l.order_index AS sort,
        l.is_main AS isMain,
        l.prematch_use_yn AS prematchUseYN,
        l.live_use_yn AS liveUseYN,
        'Admin' AS updateUserName,
        l.updated_at AS updateDate
      FROM leagues l
      JOIN sports s ON l.sport_id = s.id
      ${whereClause}
      ORDER BY l.is_main DESC, l.order_index ASC, l.name ASC
      LIMIT ? OFFSET ?
    `;

    const [rows] = await db.query(query, [...params, limit, offset]);

    const countQuery = `SELECT COUNT(*) AS total FROM leagues l ${whereClause}`;
    const [countRows] = await db.query(countQuery, params);
    const total = countRows[0].total;

    res.status(200).json({
      ReturnCode: 0,
      ReturnMessage: "Success",
      data: {
        items: rows,
        pagination: {
          total,
          page: parseInt(page, 10),
          pageSize: limit,
          totalPages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    console.error("Error in getSportCompetitionSettings:", error);
    res.status(500).json({ ReturnCode: 1, ReturnMessage: error.message });
  }
};

/**
 * POST /api/admin/sport-competition-setting/:id
 * Update a competition setting
 */
exports.updateSportCompetitionSetting = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      displayName,
      sort,
      isMain,
      prematchUseYN,
      liveUseYN,
      imageUrl,
    } = req.body;

    const query = `
      UPDATE leagues
      SET 
        display_name = ?,
        order_index = ?,
        is_main = ?,
        prematch_use_yn = ?,
        live_use_yn = ?,
        logo = ?
      WHERE id = ?
    `;

    await db.execute(query, [
      displayName || "",
      parseInt(sort, 10) || 0,
      isMain === "1" || isMain === true ? 1 : 0,
      prematchUseYN === "1" || prematchUseYN === true ? 1 : 0,
      liveUseYN === "1" || liveUseYN === true ? 1 : 0,
      imageUrl || null,
      id
    ]);

    res.status(200).json({
      ReturnCode: 0,
      ReturnMessage: "저장되었습니다.",
    });
  } catch (error) {
    console.error("Error in updateSportCompetitionSetting:", error);
    res.status(500).json({ ReturnCode: 1, ReturnMessage: error.message });
  }
};
