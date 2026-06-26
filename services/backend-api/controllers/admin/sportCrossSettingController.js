const pool = require("../../config/db");

exports.getMarketTypes = async (req, res) => {
  try {
    const { sportIdx, typeCrossSpecial } = req.query;

    let query = `
      SELECT sportName, marketTypeIdx, marketTypeName, displayName, typeFlag, typeCrossSpecial, sportIdx, useSingle
      FROM sport_market_types
      WHERE 1=1
    `;
    const params = [];

    if (sportIdx) {
      query += ` AND sportIdx = ?`;
      params.push(parseInt(sportIdx, 10));
    }

    if (typeCrossSpecial) {
      query += ` AND typeCrossSpecial = ?`;
      params.push(parseInt(typeCrossSpecial, 10));
    }

    let connectionPool = pool;
    if (pool.default) {
      connectionPool = pool.default;
    }

    const [rows] = await connectionPool.query(query, params);

    res.json(rows.map(row => ({
      ...row,
      useSingle: row.useSingle === 1
    })));
  } catch (error) {
    console.error("Error fetching market types for cross settings:", error);
    res.status(500).json({ ReturnCode: -1, ReturnMessage: "Internal server error" });
  }
};

exports.getCrossSettings = async (req, res) => {
  try {
    const query = `SELECT id, typeFlag, typeSameMatch, crossSetting FROM sport_cross_settings`;
    
    let connectionPool = pool;
    if (pool.default) {
      connectionPool = pool.default;
    }

    const [rows] = await connectionPool.query(query);

    res.json({
      success: true,
      data: rows,
    });
  } catch (error) {
    console.error("Error fetching cross settings:", error);
    res.status(500).json({ ReturnCode: -1, ReturnMessage: "Internal server error" });
  }
};

exports.updateSingle = async (req, res) => {
  try {
    const { marketTypeIdx, useSingle } = req.body;

    const query = `UPDATE sport_market_types SET useSingle = ? WHERE marketTypeIdx = ?`;

    let connectionPool = pool;
    if (pool.default) {
      connectionPool = pool.default;
    }

    await connectionPool.query(query, [useSingle, parseInt(marketTypeIdx, 10)]);

    res.json({ ReturnCode: 0, ReturnMessage: "Success" });
  } catch (error) {
    console.error("Error updating single:", error);
    res.status(500).json({ ReturnCode: -1, ReturnMessage: "Internal server error" });
  }
};

exports.createCrossSetting = async (req, res) => {
  try {
    const { typeFlag, typeSameMatch, crossSetting } = req.body;

    const query = `
      INSERT INTO sport_cross_settings (typeFlag, typeSameMatch, crossSetting)
      VALUES (?, ?, ?)
    `;

    let connectionPool = pool;
    if (pool.default) {
      connectionPool = pool.default;
    }

    await connectionPool.query(query, [typeFlag, typeSameMatch, crossSetting]);

    res.json({ ReturnCode: 0, ReturnMessage: "Success" });
  } catch (error) {
    console.error("Error creating cross setting:", error);
    res.status(500).json({ ReturnCode: -1, ReturnMessage: "Internal server error" });
  }
};

exports.updateCrossSetting = async (req, res) => {
  try {
    const { crossSettingIdx, typeFlag, typeSameMatch, crossSetting } = req.body;

    const query = `
      UPDATE sport_cross_settings
      SET typeFlag = ?, typeSameMatch = ?, crossSetting = ?
      WHERE id = ?
    `;

    let connectionPool = pool;
    if (pool.default) {
      connectionPool = pool.default;
    }

    await connectionPool.query(query, [typeFlag, typeSameMatch, crossSetting, parseInt(crossSettingIdx, 10)]);

    res.json({ ReturnCode: 0, ReturnMessage: "Success" });
  } catch (error) {
    console.error("Error updating cross setting:", error);
    res.status(500).json({ ReturnCode: -1, ReturnMessage: "Internal server error" });
  }
};

exports.deleteCrossSetting = async (req, res) => {
  try {
    const { crossSettingIdx } = req.body;

    const query = `DELETE FROM sport_cross_settings WHERE id = ?`;

    let connectionPool = pool;
    if (pool.default) {
      connectionPool = pool.default;
    }

    await connectionPool.query(query, [parseInt(crossSettingIdx, 10)]);

    res.json({ ReturnCode: 0, ReturnMessage: "Success" });
  } catch (error) {
    console.error("Error deleting cross setting:", error);
    res.status(500).json({ ReturnCode: -1, ReturnMessage: "Internal server error" });
  }
};
