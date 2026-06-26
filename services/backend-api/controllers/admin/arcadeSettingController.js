const db = require("../../config/db");

/**
 * GET /api/admin/arcade-setting
 * Get arcade settings for a specific game type or list all game types
 */
exports.getArcadeSettings = async (req, res) => {
  try {
    const { gameTypeIdx } = req.query;

    if (gameTypeIdx) {
      // Return detailed settings for specific game type
      const gameTypeId = parseInt(gameTypeIdx, 10);

      // Get game type info
      const [gameTypeRows] = await db.execute(
        "SELECT id, name, slug, interval_minutes, is_active FROM arcade_game_types WHERE id = ?",
        [gameTypeId],
      );

      if (gameTypeRows.length === 0) {
        return res.status(404).json({
          ReturnCode: 1,
          ReturnMessage: "Game type not found",
        });
      }

      const gameType = gameTypeRows[0];

      // Get settings from arcade_settings table
      const [settingsRows] = await db.execute(
        "SELECT setting_key, setting_value FROM arcade_settings WHERE game_type_id = ?",
        [gameTypeId],
      );

      // Convert settings to object
      const settings = {};
      settingsRows.forEach((row) => {
        settings[row.setting_key] = row.setting_value;
      });

      // Mock gameCodes for now - in a real implementation, this would come from another table
      const gameCodes = [
        {
          gameCodeIdx: 1,
          codeName: "홀짝",
          gameCodeUseYN: 1,
          sortOrder: 1,
          picks: [
            {
              gamePickIdx: 1,
              label: "홀",
              value: settings.odds_base || "1.95",
              sortOrder: 1,
            },
            {
              gamePickIdx: 2,
              label: "짝",
              value: settings.odds_base || "1.95",
              sortOrder: 2,
            },
          ],
        },
        {
          gameCodeIdx: 2,
          codeName: "대중소",
          gameCodeUseYN: 1,
          sortOrder: 2,
          picks: [
            {
              gamePickIdx: 3,
              label: "대",
              value: settings.odds_base || "1.95",
              sortOrder: 1,
            },
            {
              gamePickIdx: 4,
              label: "중",
              value: settings.odds_base || "1.95",
              sortOrder: 2,
            },
            {
              gamePickIdx: 5,
              label: "소",
              value: settings.odds_base || "1.95",
              sortOrder: 3,
            },
          ],
        },
      ];

      const response = {
        ReturnCode: 0,
        ReturnMessage: "Success",
        data: {
          gameType: {
            gameTypeUseYN: gameType.is_active,
            gameTypeClose: 0, // Mock value
          },
          baseSettings: {
            endTimeSeconds: gameType.interval_minutes * 60, // Convert minutes to seconds
            bettingType: "1", // Mock
            singleBetMinMoney: settings.min_bet || "100",
            singleBetMaxMoney: settings.max_bet || "100000",
            singleBetWinMoney: "0", // Mock
            multiBetMinMoney: settings.min_bet || "100",
            multiBetMaxMoney: settings.max_bet || "100000",
            multiBetWinMoney: "0", // Mock
            gameNotice: "", // Mock
          },
          gameCodes: gameCodes,
        },
      };

      return res.status(200).json(response);
    } else {
      // List all game types (original functionality)
      const {
        page = 1,
        pageSize = 10,
        searchType,
        searchText,
        sortField = "id",
        sortOrder = "asc",
      } = req.query;

      const limit = parseInt(pageSize, 10) || 10;
      const pageNum = parseInt(page, 10) || 1;
      const offset = (pageNum - 1) * limit;

      let whereClause = "WHERE 1=1";
      const params = [];

      if (searchType && searchText && searchText.trim() !== "") {
        if (searchType === "1") {
          // Game type name
          whereClause += " AND agt.name LIKE ?";
          params.push(`%${searchText}%`);
        } else if (searchType === "2") {
          // Slug
          whereClause += " AND agt.slug LIKE ?";
          params.push(`%${searchText}%`);
        } else {
          // All
          whereClause += " AND (agt.name LIKE ? OR agt.slug LIKE ?)";
          params.push(`%${searchText}%`, `%${searchText}%`);
        }
      }

      // Sort mapping
      const sortMap = {
        id: "agt.id",
        name: "agt.name",
        slug: "agt.slug",
        interval: "agt.interval_minutes",
        updatedAt: "agt.created_at",
      };
      const orderByField = sortMap[sortField] || "agt.id";
      const orderByOrder = sortOrder.toLowerCase() === "desc" ? "DESC" : "ASC";

      const query = `
        SELECT
          agt.id AS gameTypeId,
          agt.name AS gameTypeName,
          agt.slug AS gameTypeSlug,
          agt.interval_minutes AS intervalMinutes,
          agt.is_active AS isActive,
          'Admin' AS updateUserName,
          agt.updated_at AS updatedAt
        FROM arcade_game_types agt
        ${whereClause}
        ORDER BY ${orderByField} ${orderByOrder}
        LIMIT ? OFFSET ?
      `;

      const [rows] = await db.query(query, [...params, limit, offset]);

      const countQuery = `SELECT COUNT(*) AS total FROM arcade_game_types agt ${whereClause}`;
      const [countRows] = await db.query(countQuery, params);
      const total = countRows[0].total;

      // Add row number (no) for frontend
      const items = rows.map((r, i) => ({
        ...r,
        no: total - offset - i,
        isActive: Number(r.isActive),
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
    }
  } catch (error) {
    console.error("Error in getArcadeSettings:", error);
    res.status(500).json({ ReturnCode: 1, ReturnMessage: error.message });
  }
};

/**
 * POST /api/admin/arcade-setting/:id
 * Update arcade game type settings
 */
exports.updateArcadeSetting = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, interval_minutes, is_active } = req.body;

    const query = `
      UPDATE arcade_game_types
      SET name = ?, slug = ?, interval_minutes = ?, is_active = ?
      WHERE id = ?
    `;

    await db.execute(query, [name, slug, interval_minutes, is_active, id]);

    res.status(200).json({
      ReturnCode: 0,
      ReturnMessage: "Arcade setting updated successfully",
    });
  } catch (error) {
    console.error("Error in updateArcadeSetting:", error);
    res.status(500).json({ ReturnCode: 1, ReturnMessage: error.message });
  }
};
