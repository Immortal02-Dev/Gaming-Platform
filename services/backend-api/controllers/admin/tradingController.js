const db = require("../../config/db");

// ── Market Management ──────────────────────────────────────────

exports.getAllMarkets = async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT * FROM trading_markets 
      ORDER BY symbol ASC
    `);
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateMarket = async (req, res) => {
  try {
    const { symbol } = req.params;
    const { 
      price, 
      max_leverage, 
      spread, 
      is_active, 
      payout_multiplier,
      name,
      icon,
      buy_volume,
      sell_volume
    } = req.body;

    const updates = [];
    const params = [];

    if (price !== undefined) {
      updates.push("price = ?");
      params.push(price);
    }
    if (max_leverage !== undefined) {
      updates.push("max_leverage = ?");
      params.push(max_leverage);
    }
    if (spread !== undefined) {
      updates.push("spread = ?");
      params.push(spread);
    }
    if (is_active !== undefined) {
      updates.push("is_active = ?");
      params.push(is_active ? 1 : 0);
    }
    if (payout_multiplier !== undefined) {
      updates.push("payout_multiplier = ?");
      params.push(payout_multiplier);
    }
    if (name !== undefined) {
        updates.push("name = ?");
        params.push(name);
    }
    if (icon !== undefined) {
        updates.push("icon = ?");
        params.push(icon);
    }
    if (buy_volume !== undefined) {
        updates.push("buy_volume = ?");
        params.push(buy_volume);
    }
    if (sell_volume !== undefined) {
        updates.push("sell_volume = ?");
        params.push(sell_volume);
    }

    if (updates.length === 0) {
      return res.status(400).json({ success: false, message: "No fields to update" });
    }

    params.push(symbol);
    await db.execute(
      `UPDATE trading_markets SET ${updates.join(", ")} WHERE symbol = ?`,
      params
    );

    res.status(200).json({ success: true, message: `Market ${symbol} updated` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── Trade Auditing ──────────────────────────────────────────────

exports.getTrades = async (req, res) => {
  try {
    const { symbol, status, search, page = 1, limit = 50 } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    let baseQuery = `
      FROM trading_trades t
      JOIN users u ON t.user_id = u.id
    `;

    const params = [];
    const whereClauses = [];

    if (symbol) {
      whereClauses.push("t.symbol = ?");
      params.push(symbol);
    }
    if (status) {
      whereClauses.push("t.status = ?");
      params.push(status);
    }
    if (search) {
      const searchTerm = `%${search}%`;
      whereClauses.push("u.username LIKE ?");
      params.push(searchTerm);
    }

    if (whereClauses.length > 0) {
      baseQuery += ` WHERE ${whereClauses.join(" AND ")}`;
    }

    // Count total trades for pagination
    const [[{ total }]] = await db.execute(
      `SELECT COUNT(*) as total ${baseQuery}`,
      params
    );

    // Fetch trades with extra details (leverage, liq_price)
    const dataQuery = `
      SELECT 
        t.*, 
        u.username 
      ${baseQuery}
      ORDER BY t.created_at DESC
      LIMIT ? OFFSET ?
    `;

    const [rows] = await db.execute(dataQuery, [
      ...params,
      String(limit),
      String(offset),
    ]);

    res.status(200).json({
      success: true,
      data: {
        data: rows,
        meta: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(total / parseInt(limit)),
        },
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getTradingRounds = async (req, res) => {
  try {
    const { symbol, status, page = 1, limit = 50 } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    let baseQuery = `FROM trading_rounds WHERE 1=1`;
    const params = [];

    if (symbol) {
      baseQuery += ` AND market_symbol = ?`;
      params.push(symbol);
    }
    if (status) {
      baseQuery += ` AND status = ?`;
      params.push(status);
    }

    const [[{ total }]] = await db.execute(`SELECT COUNT(*) as total ${baseQuery}`, params);

    const [rows] = await db.execute(`
      SELECT * ${baseQuery} 
      ORDER BY start_time DESC 
      LIMIT ? OFFSET ?
    `, [...params, String(limit), String(offset)]);

    res.status(200).json({
      success: true,
      data: {
        data: rows,
        meta: {
          total,
          page: parseInt(page),
          limit: parseInt(limit),
          totalPages: Math.ceil(total / parseInt(limit))
        }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
