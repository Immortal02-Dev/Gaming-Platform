const pool = require("../../config/db");

exports.getSettings = async (req, res) => {
  try {
    const { typeFlag } = req.query;

    if (!typeFlag) {
      return res.status(400).json({
        success: false,
        ReturnCode: -1,
        message: "Missing typeFlag",
      });
    }

    const query = `
      SELECT sportIdx as sport_id, groupIdx as group_idx, category, sumOdds as sum_odds, defaultOdds as default_odds
      FROM sport_sum_odds_settings
      WHERE typeFlagIdx = ?
    `;

    let connectionPool = pool;
    if (pool.default) {
      connectionPool = pool.default;
    }

    const [rows] = await connectionPool.query(query, [parseInt(typeFlag, 10)]);

    res.json({
      success: true,
      ReturnCode: 0,
      data: {
        items: rows,
      },
    });
  } catch (error) {
    console.error("Error fetching sum odds settings:", error);
    res.status(500).json({
      success: false,
      ReturnCode: -1,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.updateSettings = async (req, res) => {
  try {
    const { typeFlagIdx, sumOdds, defaultOdds } = req.body;

    if (!typeFlagIdx) {
      return res.status(400).json({
        success: false,
        ReturnCode: -1,
        message: "Missing typeFlagIdx",
      });
    }

    let connectionPool = pool;
    if (pool.default) {
      connectionPool = pool.default;
    }

    const connection = await connectionPool.getConnection();

    try {
      await connection.beginTransaction();

      // We use upsert logic using ON DUPLICATE KEY UPDATE to handle dynamic sports.
      // But clearing and inserting is easier and perfectly matches our previous logic.
      await connection.query(
        "DELETE FROM sport_sum_odds_settings WHERE typeFlagIdx = ?",
        [parseInt(typeFlagIdx, 10)]
      );

      const insertData = [];

      // Parse the nested structure
      const sportsIds = Object.keys(sumOdds || {});
      // Also iterate defaultOdds keys in case sumOdds is missing for some sport
      for (const sp of Object.keys(defaultOdds || {})) {
        if (!sportsIds.includes(sp)) sportsIds.push(sp);
      }

      for (const sid of sportsIds) {
        const groups1 = (sumOdds && sumOdds[sid]) || {};
        const groups2 = (defaultOdds && defaultOdds[sid]) || {};
        
        const gids = Object.keys(groups1);
        for (const g of Object.keys(groups2)) {
          if (!gids.includes(g)) gids.push(g);
        }

        for (const gid of gids) {
          const cats1 = groups1[gid] || {};
          const cats2 = groups2[gid] || {};

          const catIds = Object.keys(cats1);
          for (const c of Object.keys(cats2)) {
            if (!catIds.includes(c)) catIds.push(c);
          }

          for (const cid of catIds) {
            const sumVal = cats1[cid];
            const defVal = cats2[cid];

            insertData.push([
              parseInt(sid, 10),
              parseInt(typeFlagIdx, 10),
              parseInt(gid, 10),
              parseInt(cid, 10),
              sumVal ? parseFloat(sumVal) : null,
              defVal ? parseFloat(defVal) : null,
            ]);
          }
        }
      }

      if (insertData.length > 0) {
        const query = `
          INSERT INTO sport_sum_odds_settings (
            sportIdx, typeFlagIdx, groupIdx, category, sumOdds, defaultOdds
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
      message: "Sum odds settings saved successfully",
    });
  } catch (error) {
    console.error("Error saving sum odds settings:", error);
    res.status(500).json({
      success: false,
      ReturnCode: -1,
      message: "Internal server error",
      error: error.message,
    });
  }
};
