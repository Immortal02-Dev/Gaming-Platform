const db = require("../config/db");

// ─────────────────────────────────────────────
// GET /api/bets/history  [PROTECTED]
// Query params: category, coin, period (24h|7d|30d|60d|90d), page, limit
// ─────────────────────────────────────────────
exports.getBetHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const { category, coin, period = "24h", page = 1, limit = 20 } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    const params = [userId];
    let whereClauses = ["b.user_id = ?"];

    // Category filter
    if (category && category !== "all") {
      whereClauses.push("b.category = ?");
      params.push(category);
    }

    // Currency / coin filter
    if (coin && coin !== "All Assets") {
      whereClauses.push("b.currency = ?");
      params.push(coin.toUpperCase());
    }

    // Time period filter
    const periodMap = {
      "24h": "INTERVAL 1 DAY",
      "7d": "INTERVAL 7 DAY",
      "30d": "INTERVAL 30 DAY",
      "60d": "INTERVAL 60 DAY",
      "90d": "INTERVAL 90 DAY",
    };
    const interval = periodMap[period] || "INTERVAL 1 DAY";
    whereClauses.push(`b.created_at >= NOW() - ${interval}`);

    const where = `WHERE ${whereClauses.join(" AND ")}`;

    const [rows] = await db.execute(
      `SELECT b.id, b.amount, b.currency, b.payout, b.profit,
              b.category, b.status, b.created_at,
              g.title AS game_title, g.slug AS game_slug, g.image AS game_image
       FROM bets b
       LEFT JOIN games g ON b.game_id = g.id
       ${where}
       ORDER BY b.created_at DESC
       LIMIT ? OFFSET ?`,
      [...params, parseInt(limit), offset],
    );

    const [countResult] = await db.execute(
      `SELECT COUNT(*) AS total FROM bets b ${where}`,
      params,
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
    res.status(500).json({ message: "Server error fetching bet history" });
  }
};

// ─────────────────────────────────────────────
// POST /api/bets/place  [PROTECTED]
// Body: { gameId, amount, currency }
// ─────────────────────────────────────────────
exports.placeBet = async (req, res) => {
  try {
    const userId = req.user.id;
    const { gameId, amount, currency = "BCD" } = req.body;

    // Validate input
    if (!gameId || !amount) {
      return res
        .status(400)
        .json({ message: "gameId and amount are required" });
    }

    if (isNaN(amount) || parseFloat(amount) <= 0) {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number" });
    }

    // Verify game exists
    const [games] = await db.execute(
      "SELECT id, title, category FROM games WHERE id = ?",
      [gameId],
    );

    if (games.length === 0) {
      return res.status(404).json({ message: "Game not found" });
    }

    const game = games[0];

    // ── Bet Limit Verification ─────────────────────────────
    const [limits] = await db.execute(
      "SELECT * FROM bet_limits WHERE (category = ? OR category = 'global') AND is_active = TRUE",
      [game.category]
    );

    let minBet = 0;
    let maxBet = Infinity;

    // Apply global limits first, then override with specific category limits if exists
    const globalLimit = limits.find(l => l.category === 'global');
    const categoryLimit = limits.find(l => l.category === game.category);

    if (globalLimit) {
      minBet = parseFloat(globalLimit.min_bet);
      maxBet = parseFloat(globalLimit.max_bet);
    }

    if (categoryLimit) {
      // Category overrides global if more restrictive or explicit
      minBet = Math.max(minBet, parseFloat(categoryLimit.min_bet));
      maxBet = Math.min(maxBet, parseFloat(categoryLimit.max_bet));
    }

    if (parseFloat(amount) < minBet) {
      return res.status(400).json({ 
        message: `Bet too low. Minimum bet for ${game.category} is ${minBet} ${currency.toUpperCase()}` 
      });
    }

    if (parseFloat(amount) > maxBet) {
      return res.status(400).json({ 
        message: `Bet too high. Maximum bet for ${game.category} is ${maxBet} ${currency.toUpperCase()}` 
      });
    }
    // ───────────────────────────────────────────────────────
    const [result] = await db.execute(
      `INSERT INTO bets (user_id, game_id, amount, currency, category, status)
       VALUES (?, ?, ?, ?, ?, 'pending')`,
      [
        userId,
        game.id,
        parseFloat(amount),
        currency.toUpperCase(),
        game.category,
      ],
    );

    res.status(201).json({
      message: "Bet placed successfully",
      data: {
        betId: result.insertId,
        userId,
        gameId: game.id,
        gameTitle: game.title,
        amount: parseFloat(amount),
        currency: currency.toUpperCase(),
        status: "pending",
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error placing bet" });
  }
};
