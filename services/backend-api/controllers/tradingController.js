const db = require("../config/db");

// ── GET /api/trading/markets ───────────────────────────────────────────
exports.getMarkets = async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM trading_markets WHERE is_active = TRUE ORDER BY created_at ASC",
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching trading markets" });
  }
};

// ── GET /api/trading/price/:symbol ─────────────────────────────────────
// Mocking price history data for the chart
exports.getPriceHistory = async (req, res) => {
  try {
    const { symbol } = req.params;
    const { interval = "1s", limit = 150 } = req.query;

    const [markets] = await db.execute(
      "SELECT price FROM trading_markets WHERE symbol = ?",
      [symbol],
    );

    if (markets.length === 0) {
      return res.status(404).json({ message: "Market not found" });
    }

    const basePrice = parseFloat(markets[0].price);
    const data = [];
    let currentPrice = basePrice;
    const now = Math.floor(Date.now() / 1000);

    for (let i = parseInt(limit); i > 0; i--) {
      currentPrice += (Math.random() - 0.5) * (basePrice * 0.001);
      data.push({
        time: now - i,
        value: parseFloat(currentPrice.toFixed(4)),
      });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching price history" });
  }
};

// ── POST /api/trading/trade ──────────────────────────────────────────── (PROTECTED)
exports.placeTrade = async (req, res) => {
  try {
    const userId = req.user.id;
    const {
      symbol,
      amount,
      direction,
      duration,
      leverage = 1,
      tp_price = null,
      sl_price = null,
      trading_type = "up-down",
      order_type = "market",
      currency = "USDT",
    } = req.body;

    if (
      !symbol ||
      !amount ||
      !direction ||
      (trading_type === "up-down" && !duration)
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Verify market exists and get current price
    const [markets] = await db.execute(
      "SELECT price, payout_multiplier, max_leverage FROM trading_markets WHERE symbol = ? AND is_active = TRUE",
      [symbol],
    );

    if (markets.length === 0) {
      return res.status(404).json({ message: "Market not found or inactive" });
    }

    const { price: entryPrice, max_leverage: marketMaxLeverage } = markets[0];

    // Validate leverage
    if (leverage > marketMaxLeverage) {
      return res
        .status(400)
        .json({
          message: `Maximum leverage for ${symbol} is ${marketMaxLeverage}X`,
        });
    }

    // Calculate Liquidation Price (Simple mockup for Contracts)
    let liqPrice = null;
    if (trading_type === "contract") {
      const maintenanceMargin = 0.005; // 0.5%
      if (direction === "buy" || direction === "up") {
        liqPrice = entryPrice * (1 - 1 / leverage + maintenanceMargin);
      } else {
        liqPrice = entryPrice * (1 + 1 / leverage - maintenanceMargin);
      }
    }

    const [result] = await db.execute(
      `INSERT INTO trading_trades (
        user_id, symbol, trading_type, order_type, amount, currency, direction, 
        leverage, duration, entry_price, tp_price, sl_price, liq_price, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
      [
        userId,
        symbol,
        trading_type,
        order_type,
        parseFloat(amount),
        currency,
        direction,
        parseInt(leverage),
        duration ? parseInt(duration) : null,
        entryPrice,
        tp_price,
        sl_price,
        liqPrice,
      ],
    );

    res.status(201).json({
      message: "Trade placed successfully",
      data: {
        tradeId: result.insertId,
        symbol,
        trading_type,
        amount: parseFloat(amount),
        direction,
        leverage,
        entryPrice,
        liqPrice,
        status: "pending",
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error placing trade" });
  }
};

// ── PATCH /api/trading/trade/:id ─────────────────────────────────────── (PROTECTED)
exports.updateTrade = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { tp_price, sl_price } = req.body;

    const [trades] = await db.execute(
      "SELECT id FROM trading_trades WHERE id = ? AND user_id = ? AND status = 'pending'",
      [id, userId],
    );

    if (trades.length === 0) {
      return res.status(404).json({ message: "Active trade not found" });
    }

    await db.execute(
      "UPDATE trading_trades SET tp_price = ?, sl_price = ? WHERE id = ?",
      [tp_price, sl_price, id],
    );

    res.status(200).json({ message: "Trade settings updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error updating trade" });
  }
};

// ── POST /api/trading/trade/:id/close ────────────────────────────────── (PROTECTED)
exports.closeTrade = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const [trades] = await db.execute(
      `SELECT t.*, m.price as current_price 
       FROM trading_trades t 
       JOIN trading_markets m ON t.symbol = m.symbol
       WHERE t.id = ? AND t.user_id = ? AND t.status = 'pending'`,
      [id, userId],
    );

    if (trades.length === 0) {
      return res.status(404).json({ message: "Active trade not found" });
    }

    const trade = trades[0];
    const currentPrice = parseFloat(trade.current_price);
    const entryPrice = parseFloat(trade.entry_price);

    // Calculate PNL (Mockup)
    let pnl = 0;
    if (trade.direction === "buy" || trade.direction === "up") {
      pnl =
        ((currentPrice - entryPrice) / entryPrice) *
        trade.amount *
        trade.leverage;
    } else {
      pnl =
        ((entryPrice - currentPrice) / entryPrice) *
        trade.amount *
        trade.leverage;
    }

    const status = pnl >= 0 ? "won" : "lost";

    await db.execute(
      `UPDATE trading_trades 
       SET exit_price = ?, profit = ?, status = ?, resolved_at = NOW() 
       WHERE id = ?`,
      [currentPrice, pnl, status, id],
    );

    res.status(200).json({
      message: "Trade closed successfully",
      data: {
        tradeId: id,
        exitPrice: currentPrice,
        profit: pnl,
        status,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error closing trade" });
  }
};

// ── GET /api/trading/positions ───────────────────────────────────────── (PROTECTED)
exports.getPositions = async (req, res) => {
  try {
    const userId = req.user.id;
    const [rows] = await db.execute(
      "SELECT * FROM trading_trades WHERE user_id = ? AND status = 'pending' ORDER BY created_at DESC",
      [userId],
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching active positions" });
  }
};

// ── GET /api/trading/history ─────────────────────────────────────────── (PROTECTED)
exports.getTradeHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 20 } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const [rows] = await db.execute(
      "SELECT * FROM trading_trades WHERE user_id = ? AND status != 'pending' ORDER BY created_at DESC LIMIT ? OFFSET ?",
      [userId, parseInt(limit), offset],
    );

    const [countResult] = await db.execute(
      "SELECT COUNT(*) AS total FROM trading_trades WHERE user_id = ? AND status != 'pending'",
      [userId],
    );

    const total = countResult[0].total;

    res.status(200).json({
      data: rows,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching trade history" });
  }
};

// ── GET /api/trading/stats ─────────────────────────────────────────────
exports.getTradingStats = async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT setting_key, setting_value FROM platform_settings WHERE setting_key LIKE 'trading_stats_%'",
    );
    const stats = rows.reduce((acc, row) => {
      acc[row.setting_key.replace("trading_stats_", "")] = row.setting_value;
      return acc;
    }, {});

    res.status(200).json({
      win_ratio_24h: parseFloat(stats.win_ratio_24h || 49),
      live_players_24h: parseInt(stats.live_players_24h || 358),
      wins_paid_24h: parseFloat(stats.wins_paid_24h || 23),
      all_time_wins_paid: parseFloat(stats.all_time_wins_paid || 147633594.99),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching trading stats" });
  }
};

// ── GET /api/trading/live-feed ─────────────────────────────────────────
exports.getLiveFeed = async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT t.*, u.username 
       FROM trading_trades t
       JOIN users u ON t.user_id = u.id
       ORDER BY t.created_at DESC
       LIMIT 20`,
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching live feed" });
  }
};

// ── GET /api/trading/leaderboard ───────────────────────────────────────
exports.getLeaderboard = async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT u.username, SUM(t.profit) as total_profit
       FROM trading_trades t
       JOIN users u ON t.user_id = u.id
       WHERE t.status = 'won'
       GROUP BY t.user_id
       ORDER BY total_profit DESC
       LIMIT 10`,
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching leaderboard" });
  }
};

// ── GET /api/trading/rounds/:market_symbol ─────────────────────────────
exports.getRounds = async (req, res) => {
  try {
    const { market_symbol } = req.params;
    const [rows] = await db.execute(
      `SELECT * FROM trading_rounds 
       WHERE market_symbol = ? 
       ORDER BY start_time DESC 
       LIMIT 20`,
      [market_symbol],
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching trading rounds" });
  }
};

// ── GET /api/trading/sentiment/:symbol ─────────────────────────────────
exports.getSentiment = async (req, res) => {
  try {
    const { symbol } = req.params;
    const [markets] = await db.execute(
      "SELECT buy_volume, sell_volume FROM trading_markets WHERE symbol = ?",
      [symbol],
    );

    if (markets.length === 0) {
      return res.status(404).json({ message: "Market not found" });
    }

    const { buy_volume, sell_volume } = markets[0];
    const total = parseFloat(buy_volume) + parseFloat(sell_volume);

    // Default to 50/50 if no volume
    let buyRatio = 0.5;
    let sellRatio = 0.5;

    if (total > 0) {
      buyRatio = parseFloat(buy_volume) / total;
      sellRatio = parseFloat(sell_volume) / total;
    }

    res.status(200).json({
      symbol,
      buyRatio: (buyRatio * 100).toFixed(2) + "%",
      sellRatio: (sellRatio * 100).toFixed(2) + "%",
      buy_volume: parseFloat(buy_volume),
      sell_volume: parseFloat(sell_volume),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching market sentiment" });
  }
};

// ── GET /api/trading/trades/:symbol ────────────────────────────────────
exports.getTradesBySymbol = async (req, res) => {
  try {
    const { symbol } = req.params;
    const [rows] = await db.execute(
      `SELECT t.entry_price as price, t.amount, t.created_at as time, t.direction
       FROM trading_trades t
       WHERE t.symbol = ? AND t.status != 'pending'
       ORDER BY t.created_at DESC
       LIMIT 20`,
      [symbol],
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching symbol trades" });
  }
};
