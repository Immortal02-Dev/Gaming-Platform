const pool = require("../../config/db");

exports.getMarketTypes = async (req, res) => {
  try {
    const { sportIdx, searchType, searchText } = req.query;

    let query = `
      SELECT * FROM sport_market_types
      WHERE 1=1
    `;
    const params = [];

    if (sportIdx) {
      query += ` AND sportIdx = ?`;
      params.push(parseInt(sportIdx, 10));
    }

    if (searchType && searchText) {
      if (searchType === "1") {
        query += ` AND marketTypeName LIKE ?`;
        params.push(`%${searchText}%`);
      } else if (searchType === "2") {
        query += ` AND displayName LIKE ?`;
        params.push(`%${searchText}%`);
      }
    }

    query += ` ORDER BY sort ASC, marketTypeIdx ASC`;

    // Make sure we unwrap the pool if we're using the promise wrapper
    // We can use pool.query dynamically. Since db.ts exports pool directly and we're in JS,
    // we should use the appropriate syntax.
    let connectionPool = pool;
    if (pool.default) {
      connectionPool = pool.default;
    }

    const [rows] = await connectionPool.query(query, params);

    res.json({
      success: true,
      data: {
        items: rows,
      },
    });
  } catch (error) {
    console.error("Error fetching market types:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

exports.updateMarketType = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      displayName,
      sort,
      prematchUseYN,
      liveUseYN,
      prematchUsePoint,
      liveUsePoint,
      prematchMinPrice,
      prematchMaxPrice,
      liveMinPrice,
      liveMaxPrice,
    } = req.body;

    const updateQuery = `
      UPDATE sport_market_types
      SET 
        displayName = ?,
        sort = ?,
        prematchUseYN = ?,
        liveUseYN = ?,
        prematchUsePoint = ?,
        liveUsePoint = ?,
        prematchMinPrice = ?,
        prematchMaxPrice = ?,
        liveMinPrice = ?,
        liveMaxPrice = ?,
        updateUserName = ?,
        updateDate = NOW()
      WHERE marketTypeIdx = ?
    `;

    const updateParams = [
      displayName || null,
      sort ? parseInt(sort, 10) : 0,
      prematchUseYN ? parseInt(prematchUseYN, 10) : 0,
      liveUseYN ? parseInt(liveUseYN, 10) : 0,
      prematchUsePoint || "",
      liveUsePoint || "",
      prematchMinPrice ? parseFloat(prematchMinPrice) : null,
      prematchMaxPrice ? parseFloat(prematchMaxPrice) : null,
      liveMinPrice ? parseFloat(liveMinPrice) : null,
      liveMaxPrice ? parseFloat(liveMaxPrice) : null,
      req.user ? req.user.username : 'Admin',
      parseInt(id, 10),
    ];

    let connectionPool = pool;
    if (pool.default) {
      connectionPool = pool.default;
    }

    await connectionPool.query(updateQuery, updateParams);

    res.json({
      success: true,
      ReturnCode: 0,
      message: "Market type updated successfully",
    });
  } catch (error) {
    console.error("Error updating market type:", error);
    res.status(500).json({
      success: false,
      ReturnCode: -1,
      message: "Internal server error",
      error: error.message,
    });
  }
};
