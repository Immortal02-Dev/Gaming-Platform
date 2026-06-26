const pool = require("../../config/db");

exports.getOddsSettings = async (req, res) => {
  try {
    const { sportIdx, typeFlagIdx } = req.query;

    if (!sportIdx || !typeFlagIdx) {
      return res.status(400).json({
        success: false,
        ReturnCode: -1,
        message: "Missing sportIdx or typeFlagIdx",
      });
    }

    const query = `
      SELECT * FROM sport_odds_settings
      WHERE sportIdx = ? AND typeFlagIdx = ?
      ORDER BY levelIdx ASC, groupIdx ASC, marketIdx ASC
    `;

    let connectionPool = pool;
    if (pool.default) {
      connectionPool = pool.default;
    }

    const [rows] = await connectionPool.query(query, [
      parseInt(sportIdx, 10),
      parseInt(typeFlagIdx, 10),
    ]);

    res.json({
      success: true,
      ReturnCode: 0,
      data: {
        items: rows,
      },
    });
  } catch (error) {
    console.error("Error fetching odds settings:", error);
    res.status(500).json({
      success: false,
      ReturnCode: -1,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.updateOddsSettings = async (req, res) => {
  try {
    const { sportIdx, typeFlagIdx, items } = req.body;

    if (!sportIdx || !typeFlagIdx || !Array.isArray(items)) {
      return res.status(400).json({
        success: false,
        ReturnCode: -1,
        message: "Invalid payload format",
      });
    }

    let connectionPool = pool;
    if (pool.default) {
      connectionPool = pool.default;
    }

    const connection = await connectionPool.getConnection();

    try {
      await connection.beginTransaction();

      // Clear existing settings for this sport and type flag to avoid unique constraint issues
      await connection.query(
        "DELETE FROM sport_odds_settings WHERE sportIdx = ? AND typeFlagIdx = ?",
        [parseInt(sportIdx, 10), parseInt(typeFlagIdx, 10)]
      );

      // We'll batch insert all the settings
      if (items.length > 0) {
        const insertData = items.map((it) => [
          parseInt(sportIdx, 10),
          parseInt(typeFlagIdx, 10),
          parseInt(it.levelIdx, 10),
          parseInt(it.groupIdx, 10),
          parseInt(it.marketIdx, 10),
          it.fromOdds ? parseFloat(it.fromOdds) : null,
          it.toOdds ? parseFloat(it.toOdds) : null,
          it.returnRate ? parseFloat(it.returnRate) : null,
        ]);

        const query = `
          INSERT INTO sport_odds_settings (
            sportIdx, typeFlagIdx, levelIdx, groupIdx, marketIdx, fromOdds, toOdds, returnRate
          ) VALUES ?
        `;

        await connection.query(query, [insertData]);
      }

      await connection.commit();
    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }

    res.json({
      success: true,
      ReturnCode: 0,
      message: "Odds settings saved successfully",
    });
  } catch (error) {
    console.error("Error saving odds settings:", error);
    res.status(500).json({
      success: false,
      ReturnCode: -1,
      message: "Internal server error",
      error: error.message,
    });
  }
};
