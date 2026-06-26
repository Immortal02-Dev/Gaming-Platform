const db = require("../config/db");

// ─────────────────────────────────────────────
// GET /api/games
// Query params: category, provider, sort, isNew, isHot, page, limit
// ─────────────────────────────────────────────
exports.getGames = async (req, res) => {
  try {
    const {
      category,
      provider,
      sort = "popular",
      isNew,
      isHot,
      page = 1,
      limit = 16,
    } = req.query;

    const offset = (parseInt(page) - 1) * parseInt(limit);
    const params = [];
    let whereClauses = [];

    if (category) {
      whereClauses.push("g.category = ?");
      params.push(category);
    }

    if (provider) {
      whereClauses.push("p.slug = ?");
      params.push(provider);
    }

    if (isNew === "true") {
      whereClauses.push("g.is_new = TRUE");
    }

    if (isHot === "true") {
      whereClauses.push("g.is_hot = TRUE");
    }

    const where = whereClauses.length
      ? `WHERE ${whereClauses.join(" AND ")}`
      : "";

    // Sorting
    let orderBy = "g.user_count DESC"; // default: popular
    if (sort === "new") orderBy = "g.created_at DESC";
    if (sort === "az") orderBy = "g.title ASC";

    const [rows] = await db.execute(
      `SELECT g.id, g.slug, g.title, g.image, g.category,
              g.user_count, g.is_new, g.is_featured, g.is_hot, g.rtp,
              p.name AS provider_name, p.slug AS provider_slug, p.logo AS provider_logo
       FROM games g
       LEFT JOIN providers p ON g.provider_id = p.id
       ${where}
       ORDER BY ${orderBy}
       LIMIT ? OFFSET ?`,
      [...params, parseInt(limit), offset],
    );

    // Total count for pagination
    const [countResult] = await db.execute(
      `SELECT COUNT(*) AS total FROM games g LEFT JOIN providers p ON g.provider_id = p.id ${where}`,
      params,
    );

    const total = countResult[0].total;
    const totalPages = Math.ceil(total / parseInt(limit));

    res.status(200).json({
      data: rows,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching games" });
  }
};

// ─────────────────────────────────────────────
// GET /api/games/featured
// Query param: section = originals | hot | live | new
// ─────────────────────────────────────────────
exports.getFeaturedGames = async (req, res) => {
  try {
    const { section = "originals", limit = 12 } = req.query;

    let whereClauses = [];
    const params = [];

    if (section === "originals") {
      whereClauses.push("g.category = 'original'");
    } else if (section === "hot") {
      whereClauses.push("g.is_hot = TRUE");
    } else if (section === "live") {
      whereClauses.push(
        "g.category IN ('baccarat','roulette','poker','blackjack','game-shows')",
      );
    } else if (section === "new") {
      whereClauses.push("g.is_new = TRUE");
    } else {
      whereClauses.push("g.is_featured = TRUE");
    }

    const where = whereClauses.length
      ? `WHERE ${whereClauses.join(" AND ")}`
      : "";

    const [rows] = await db.execute(
      `SELECT g.id, g.slug, g.title, g.image, g.category,
              g.user_count, g.is_new, g.is_featured, g.is_hot,
              p.name AS provider_name, p.slug AS provider_slug
       FROM games g
       LEFT JOIN providers p ON g.provider_id = p.id
       ${where}
       ORDER BY g.user_count DESC
       LIMIT ?`,
      [...params, parseInt(limit)],
    );

    res.status(200).json({ section, data: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching featured games" });
  }
};

// ─────────────────────────────────────────────
// GET /api/games/search?q=crash
// ─────────────────────────────────────────────
exports.searchGames = async (req, res) => {
  try {
    const { q = "", limit = 20 } = req.query;

    if (!q.trim()) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const [rows] = await db.execute(
      `SELECT g.id, g.slug, g.title, g.image, g.category,
              g.user_count, g.is_new,
              p.name AS provider_name
       FROM games g
       LEFT JOIN providers p ON g.provider_id = p.id
       WHERE g.title LIKE ?
       ORDER BY g.user_count DESC
       LIMIT ?`,
      [`%${q}%`, parseInt(limit)],
    );

    res.status(200).json({ query: q, data: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during search" });
  }
};

// ─────────────────────────────────────────────
// GET /api/games/favorites [PROTECTED]
// ─────────────────────────────────────────────
exports.getFavorites = async (req, res) => {
  try {
    const userId = req.user.id; // from authMiddleware

    const [rows] = await db.execute(
      `SELECT g.id, g.slug, g.title, g.image, g.category,
              g.user_count, g.is_new, g.is_hot,
              p.name AS provider_name
       FROM games g
       JOIN user_favorites f ON g.id = f.game_id
       LEFT JOIN providers p ON g.provider_id = p.id
       WHERE f.user_id = ?
       ORDER BY f.created_at DESC`,
      [userId],
    );

    res.status(200).json({ data: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching favorites" });
  }
};

// ─────────────────────────────────────────────
// GET /api/games/:idOrSlug
// ─────────────────────────────────────────────
exports.getGameById = async (req, res) => {
  try {
    const { idOrSlug } = req.params;

    // Support lookup by numeric ID or string slug
    const isNumeric = /^\d+$/.test(idOrSlug);
    const field = isNumeric ? "g.id" : "g.slug";

    const [rows] = await db.execute(
      `SELECT g.id, g.slug, g.title, g.image, g.category,
              g.user_count, g.is_new, g.is_featured, g.is_hot, g.rtp,
              p.id AS provider_id, p.name AS provider_name, p.logo AS provider_logo
       FROM games g
       LEFT JOIN providers p ON g.provider_id = p.id
       WHERE ${field} = ?`,
      [idOrSlug],
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Game not found" });
    }

    res.status(200).json({ data: rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching game" });
  }
};

// ─────────────────────────────────────────────
// POST /api/games/:idOrSlug/launch  [PROTECTED]
// Initiates a game session for the authenticated user
// ─────────────────────────────────────────────
exports.launchGame = async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    const userId = req.user.id;

    const isNumeric = /^\d+$/.test(idOrSlug);
    const field = isNumeric ? "id" : "slug";

    const [rows] = await db.execute(
      `SELECT id, slug, title FROM games WHERE ${field} = ?`,
      [idOrSlug],
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Game not found" });
    }

    const game = rows[0];

    // In a real integration this would call a 3rd-party game provider API.
    // For now we return a mock session token + launch URL.
    const sessionToken = Buffer.from(
      `${userId}:${game.id}:${Date.now()}`,
    ).toString("base64");

    res.status(200).json({
      message: "Game session created",
      data: {
        gameId: game.id,
        slug: game.slug,
        title: game.title,
        launchUrl: `/play/${game.slug}?session=${sessionToken}`,
        sessionToken,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error launching game" });
  }
};

// ─────────────────────────────────────────────
// GET /api/games/recent  [PROTECTED]
// ─────────────────────────────────────────────
exports.getRecentGames = async (req, res) => {
  try {
    const userId = req.user.id;
    const { limit = 8 } = req.query;

    // Get unique game_ids the user has bet on, most recent first
    const [rows] = await db.execute(
      `SELECT g.*, p.name as provider_name
       FROM games g
       JOIN (
         SELECT game_id, MAX(created_at) as last_played
         FROM bets
         WHERE user_id = ?
         GROUP BY game_id
       ) b ON g.id = b.game_id
       LEFT JOIN providers p ON g.provider_id = p.id
       ORDER BY b.last_played DESC
       LIMIT ?`,
      [userId, parseInt(limit)],
    );

    // Cast MySQL boolean (0/1) to actual boolean for React
    const games = rows.map((game) => ({
      ...game,
      isNew: !!game.is_new,
      isFeatured: !!game.is_featured,
      isHot: !!game.is_hot,
    }));

    res.status(200).json(games);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching recent games" });
  }
};
