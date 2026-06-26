const db = require("../config/db");

// ─────────────────────────────────────────────
// GET /api/lottery
// ─────────────────────────────────────────────
exports.getLotteries = async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM lotteries ORDER BY draw_time ASC"
    );
    res.status(200).json({ data: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching lotteries" });
  }
};

// ─────────────────────────────────────────────
// GET /api/lottery/featured
// ─────────────────────────────────────────────
exports.getFeaturedLotteries = async (req, res) => {
  try {
    const { section } = req.query;

    if (section === "upcoming") {
      const [rows] = await db.execute(
        "SELECT * FROM lotteries WHERE draw_time > NOW() ORDER BY draw_time ASC LIMIT 5"
      );
      return res.status(200).json({ section, data: rows });
    }

    if (section === "popular") {
      const [rows] = await db.execute(
        "SELECT * FROM lotteries WHERE is_popular = TRUE LIMIT 8"
      );
      return res.status(200).json({ section, data: rows });
    }

    // Default: return both sections integrated for backward compatibility or general use
    const [upcoming] = await db.execute(
      "SELECT * FROM lotteries WHERE draw_time > NOW() ORDER BY draw_time ASC LIMIT 5"
    );
    const [popular] = await db.execute(
      "SELECT * FROM lotteries WHERE is_popular = TRUE LIMIT 8"
    );

    res.status(200).json({
      sections: [
        { title: "Upcoming Draw", data: upcoming, section: "upcoming" },
        { title: "Popular", data: popular, section: "popular" },
      ],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching featured lotteries" });
  }
};

// ─────────────────────────────────────────────
// GET /api/lottery/:idOrSlug
// ─────────────────────────────────────────────
exports.getLotteryById = async (req, res) => {
  try {
    const { idOrSlug } = req.params;
    const isNumeric = /^\d+$/.test(idOrSlug);
    const field = isNumeric ? "id" : "slug";

    const [rows] = await db.execute(
      `SELECT * FROM lotteries WHERE ${field} = ?`,
      [idOrSlug]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Lottery not found" });
    }

    res.status(200).json({ data: rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching lottery" });
  }
};
