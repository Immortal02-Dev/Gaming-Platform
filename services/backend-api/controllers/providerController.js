const db = require("../config/db");

// ─────────────────────────────────────────────
// GET /api/providers
// Returns all game providers (for /casino/provider page)
// ─────────────────────────────────────────────
exports.getProviders = async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT id, slug, name, logo, game_count
       FROM providers
       ORDER BY game_count DESC`,
    );

    res.status(200).json({ data: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching providers" });
  }
};

// ─────────────────────────────────────────────
// GET /api/providers/:slug/games
// Returns all games for a specific provider (paginated)
// ─────────────────────────────────────────────
exports.getGamesByProvider = async (req, res) => {
  try {
    const { slug } = req.params;
    const { sort = "popular", page = 1, limit = 16 } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    // Verify provider exists
    const [provider] = await db.execute(
      "SELECT id, name, logo FROM providers WHERE slug = ?",
      [slug],
    );

    if (provider.length === 0) {
      return res.status(404).json({ message: "Provider not found" });
    }

    // Sorting
    let orderBy = "g.user_count DESC";
    if (sort === "new") orderBy = "g.created_at DESC";
    if (sort === "az") orderBy = "g.title ASC";

    const [rows] = await db.execute(
      `SELECT g.id, g.slug, g.title, g.image, g.category,
              g.user_count, g.is_new, g.is_hot
       FROM games g
       WHERE g.provider_id = ?
       ORDER BY ${orderBy}
       LIMIT ? OFFSET ?`,
      [provider[0].id, parseInt(limit), offset],
    );

    const [countResult] = await db.execute(
      "SELECT COUNT(*) AS total FROM games WHERE provider_id = ?",
      [provider[0].id],
    );

    const total = countResult[0].total;

    res.status(200).json({
      provider: provider[0],
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
    res.status(500).json({ message: "Server error fetching provider games" });
  }
};
