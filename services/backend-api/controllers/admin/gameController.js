const db = require("../../config/db");

// ── Game Management ──────────────────────────────────────────

exports.getAllGames = async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT g.*, p.name as provider_name 
      FROM games g 
      LEFT JOIN providers p ON g.provider_id = p.id
    `);
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createGame = async (req, res) => {
  try {
    const {
      title,
      slug,
      category,
      provider_id,
      image,
      is_hot,
      is_featured,
      is_new,
      rtp,
      is_maintenance,
    } = req.body;

    // Generate slug from title if not provided
    const gameSlug =
      slug ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    await db.execute(
      "INSERT INTO games (title, slug, category, provider_id, image, is_hot, is_featured, is_new, rtp, is_maintenance) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        title,
        gameSlug,
        category,
        provider_id || null,
        image || null,
        is_hot ? 1 : 0,
        is_featured ? 1 : 0,
        is_new ? 1 : 0,
        rtp || 96.0,
        is_maintenance ? 1 : 0,
      ],
    );
    res.status(201).json({ success: true, message: "Game created" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateGame = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      slug,
      category,
      provider_id,
      image,
      is_hot,
      is_featured,
      is_new,
      rtp,
      is_maintenance,
    } = req.body;

    const updates = [];
    const params = [];

    if (title !== undefined) {
      updates.push("title = ?");
      params.push(title);
    }
    if (slug !== undefined) {
      updates.push("slug = ?");
      params.push(slug);
    }
    if (category !== undefined) {
      updates.push("category = ?");
      params.push(category);
    }
    if (provider_id !== undefined) {
      updates.push("provider_id = ?");
      params.push(provider_id || null);
    }
    if (image !== undefined) {
      updates.push("image = ?");
      params.push(image || null);
    }
    if (is_hot !== undefined) {
      updates.push("is_hot = ?");
      params.push(is_hot ? 1 : 0);
    }
    if (is_featured !== undefined) {
      updates.push("is_featured = ?");
      params.push(is_featured ? 1 : 0);
    }
    if (is_new !== undefined) {
      updates.push("is_new = ?");
      params.push(is_new ? 1 : 0);
    }
    if (rtp !== undefined) {
      updates.push("rtp = ?");
      params.push(rtp);
    }
    if (is_maintenance !== undefined) {
      updates.push("is_maintenance = ?");
      params.push(is_maintenance ? 1 : 0);
    }

    if (updates.length === 0)
      return res
        .status(400)
        .json({ success: false, message: "No fields to update" });

    params.push(id);
    await db.execute(
      `UPDATE games SET ${updates.join(", ")} WHERE id = ?`,
      params,
      `  `,
    );
    res.status(200).json({ success: true, message: "Game updated" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteGame = async (req, res) => {
  try {
    const { id } = req.params;
    await db.execute("DELETE FROM games WHERE id = ?", [id]);
    res.status(200).json({ success: true, message: "Game deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getProviders = async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM providers ORDER BY name ASC",
    );
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateProvider = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, logo, is_maintenance } = req.body;

    const updates = [];
    const params = [];

    if (name !== undefined) {
      updates.push("name = ?");
      params.push(name);
    }
    if (logo !== undefined) {
      updates.push("logo = ?");
      params.push(logo);
    }
    if (is_maintenance !== undefined) {
      updates.push("is_maintenance = ?");
      params.push(is_maintenance ? 1 : 0);
    }

    if (updates.length === 0)
      return res
        .status(400)
        .json({ success: false, message: "No fields to update" });

    params.push(id);
    await db.execute(
      `UPDATE providers SET ${updates.join(", ")} WHERE id = ?`,
      params,
    );
    res.status(200).json({ success: true, message: "Provider updated" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getBetHistory = async (req, res) => {
  try {
    const { status, category, search, page = 1, limit = 50 } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    let baseQuery = `
      FROM bets b
      JOIN users u ON b.user_id = u.id
      JOIN games g ON b.game_id = g.id
    `;

    const params = [];
    const whereClauses = [];

    if (status) {
      whereClauses.push("b.status = ?");
      params.push(status);
    }

    if (category) {
      whereClauses.push("b.category = ?");
      params.push(category);
    }

    if (search) {
      const searchTerm = `%${search}%`;
      whereClauses.push("(u.username LIKE ? OR g.title LIKE ?)");
      params.push(searchTerm, searchTerm);
    }

    if (whereClauses.length > 0) {
      baseQuery += ` WHERE ${whereClauses.join(" AND ")}`;
    }

    // Count total bets for pagination
    const [[{ total }]] = await db.execute(
      `SELECT COUNT(*) as total ${baseQuery}`,
      params,
    );

    // Fetch bets with pagination
    const dataQuery = `
      SELECT 
        b.*, 
        u.username,
        g.title as game_title,
        g.image as game_image
      ${baseQuery}
      ORDER BY b.created_at DESC
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
