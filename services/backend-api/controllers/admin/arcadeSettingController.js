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
        `SELECT agt.id, agt.name, agt.slug, agt.interval_minutes, agt.is_active,
                COALESCE(g.is_maintenance, 0) AS game_type_close
         FROM arcade_game_types agt
         LEFT JOIN games g ON g.id = agt.id
         WHERE agt.id = ?`,
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

      const [gameCodeRows] = await db.execute(
        `SELECT
           agc.id AS gameCodeId,
           agc.game_code_idx AS gameCodeIdx,
           agc.code_name AS codeName,
           agc.use_yn AS gameCodeUseYN,
           agc.sort_order AS codeSortOrder,
           agp.game_pick_idx AS gamePickIdx,
           agp.label,
           agp.odds,
           agp.sort_order AS pickSortOrder
         FROM arcade_game_codes agc
         LEFT JOIN arcade_game_picks agp ON agp.game_code_id = agc.id
         WHERE agc.game_type_id = ?
         ORDER BY agc.sort_order, agp.sort_order`,
        [gameTypeId],
      );

      const gameCodes = [];
      const gameCodeMap = new Map();
      gameCodeRows.forEach((row) => {
        let gameCode = gameCodeMap.get(row.gameCodeIdx);
        if (!gameCode) {
          gameCode = {
            gameCodeIdx: row.gameCodeIdx,
            codeName: row.codeName,
            gameCodeUseYN: Number(row.gameCodeUseYN),
            sortOrder: Number(row.codeSortOrder),
            picks: [],
          };
          gameCodeMap.set(row.gameCodeIdx, gameCode);
          gameCodes.push(gameCode);
        }
        if (row.gamePickIdx !== null) {
          gameCode.picks.push({
            gamePickIdx: row.gamePickIdx,
            label: row.label,
            value: row.odds,
            sortOrder: Number(row.pickSortOrder),
          });
        }
      });

      const response = {
        ReturnCode: 0,
        ReturnMessage: "Success",
        data: {
          gameType: {
            gameTypeUseYN: gameType.is_active,
            gameTypeClose: Number(gameType.game_type_close),
          },
          baseSettings: {
            endTimeSeconds: settings.end_time_seconds || null,
            bettingType: settings.betting_type || null,
            singleBetMinMoney: settings.single_bet_min_money || null,
            singleBetMaxMoney: settings.single_bet_max_money || null,
            singleBetWinMoney: settings.single_bet_win_money || null,
            multiBetMinMoney: settings.multi_bet_min_money || null,
            multiBetMaxMoney: settings.multi_bet_max_money || null,
            multiBetWinMoney: settings.multi_bet_win_money || null,
            gameNotice: settings.game_notice || "",
          },
          gameCodes,
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
          agt.created_at AS updatedAt
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

exports.updateArcadeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { key, value } = req.body;
    if (key !== "gameTypeUseYN" && key !== "gameTypeClose") {
      return res
        .status(400)
        .json({ ReturnCode: 1, ReturnMessage: "Invalid key provided" });
    }

    const table = key === "gameTypeUseYN" ? "arcade_game_types" : "games";
    const column = key === "gameTypeUseYN" ? "is_active" : "is_maintenance";
    const [result] = await db.execute(
      `UPDATE ${table} SET ${column} = ? WHERE id = ?`,
      [Number(value) === 1 ? 1 : 0, parseInt(id, 10)],
    );
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ ReturnCode: 1, ReturnMessage: "Game type not found" });
    }
    return res.status(200).json({
      ReturnCode: 0,
      ReturnMessage: "Game status updated successfully",
    });
  } catch (error) {
    console.error("Error in updateArcadeStatus:", error);
    return res
      .status(500)
      .json({ ReturnCode: 1, ReturnMessage: error.message });
  }
};

exports.updateArcadeBaseSettings = async (req, res) => {
  try {
    const gameTypeId = parseInt(req.params.id, 10);
    const settingMap = {
      endTimeSeconds: "end_time_seconds",
      bettingType: "betting_type",
      singleBetMinMoney: "single_bet_min_money",
      singleBetMaxMoney: "single_bet_max_money",
      singleBetWinMoney: "single_bet_win_money",
      multiBetMinMoney: "multi_bet_min_money",
      multiBetMaxMoney: "multi_bet_max_money",
      multiBetWinMoney: "multi_bet_win_money",
      gameNotice: "game_notice",
    };
    for (const [requestKey, settingKey] of Object.entries(settingMap)) {
      if (!(requestKey in req.body)) continue;
      await db.execute(
        `INSERT INTO arcade_settings (game_type_id, setting_key, setting_value)
         VALUES (?, ?, ?)
         ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)`,
        [gameTypeId, settingKey, req.body[requestKey] ?? ""],
      );
    }
    return res.status(200).json({
      ReturnCode: 0,
      ReturnMessage: "Arcade settings updated successfully",
    });
  } catch (error) {
    console.error("Error in updateArcadeBaseSettings:", error);
    return res
      .status(500)
      .json({ ReturnCode: 1, ReturnMessage: error.message });
  }
};

exports.updateArcadeGameCodeStatus = async (req, res) => {
  try {
    const gameTypeId = parseInt(req.params.id, 10);
    const gameCodeIdx = parseInt(req.params.gameCodeIdx, 10);
    const value = Number(req.body.useYN) === 1 ? 1 : 0;

    await db.execute(
      `UPDATE arcade_game_codes
       SET use_yn = ?
       WHERE game_type_id = ? AND game_code_idx = ?`,
      [value, gameTypeId, gameCodeIdx],
    );

    return res.status(200).json({
      ReturnCode: 0,
      ReturnMessage: "Game code status updated successfully",
    });
  } catch (error) {
    console.error("Error in updateArcadeGameCodeStatus:", error);
    return res
      .status(500)
      .json({ ReturnCode: 1, ReturnMessage: error.message });
  }
};

exports.updateArcadeGameCodePicks = async (req, res) => {
  try {
    const gameTypeId = parseInt(req.params.id, 10);
    const gameCodeIdx = parseInt(req.params.gameCodeIdx, 10);
    const picks = Array.isArray(req.body.picks) ? req.body.picks : [];

    for (const pick of picks) {
      const gamePickIdx = parseInt(pick.gamePickIdx, 10);
      if (Number.isNaN(gamePickIdx)) continue;
      await db.execute(
        `UPDATE arcade_game_picks agp
         INNER JOIN arcade_game_codes agc ON agc.id = agp.game_code_id
         SET agp.odds = ?
         WHERE agc.game_type_id = ?
           AND agc.game_code_idx = ?
           AND agp.game_pick_idx = ?`,
        [pick.odds ?? 0, gameTypeId, gameCodeIdx, gamePickIdx],
      );
    }

    return res.status(200).json({
      ReturnCode: 0,
      ReturnMessage: "Game code picks updated successfully",
    });
  } catch (error) {
    console.error("Error in updateArcadeGameCodePicks:", error);
    return res
      .status(500)
      .json({ ReturnCode: 1, ReturnMessage: error.message });
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
