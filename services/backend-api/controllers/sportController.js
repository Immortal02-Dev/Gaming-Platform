const db = require("../config/db");

// ─────────────────────────────────────────────
// GET /api/sports
// Returns all active sports with their metadata
// ─────────────────────────────────────────────
exports.getSports = async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM sports ORDER BY order_index ASC",
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching sports" });
  }
};

// ─────────────────────────────────────────────
// GET /api/sports/matches
// Query params: type (popular|live|upcoming), sportSlug
// ─────────────────────────────────────────────
exports.getMatches = async (req, res) => {
  try {
    const { type = "popular", sportSlug, ids } = req.query;

    let query = `
      SELECT 
        m.id, m.status, m.is_live as isLive, m.home_score as homeScore, m.away_score as awayScore, 
        m.period_info as status_info, m.slug, m.start_time,
        l.name as league_name, l.region as country,
        s.slug as sport_slug, s.name as sport_name,
        t1.name as home_team_name, t1.logo as home_team_logo,
        t2.name as away_team_name, t2.logo as away_team_logo
      FROM match_events m
      JOIN leagues l ON m.league_id = l.id
      JOIN sports s ON l.sport_id = s.id
      JOIN teams t1 ON m.home_team_id = t1.id
      JOIN teams t2 ON m.away_team_id = t2.id
    `;

    const params = [];
    const whereClauses = [];

    if (ids) {
      const idArray = Array.isArray(ids) ? ids : ids.split(",");
      if (idArray.length > 0) {
        whereClauses.push(`m.id IN (${idArray.map(() => "?").join(",")})`);
        params.push(...idArray);
      }
    } else {
      if (type === "popular") whereClauses.push("m.is_popular = TRUE");
      if (type === "live") whereClauses.push("m.is_live = TRUE");
      if (type === "upcoming")
        whereClauses.push("m.status = 'upcoming' AND m.is_live = FALSE");

      if (sportSlug) {
        whereClauses.push("s.slug = ?");
        params.push(sportSlug);
      }
    }

    if (whereClauses.length > 0) {
      query += ` WHERE ${whereClauses.join(" AND ")}`;
    }

    query += " ORDER BY m.start_time ASC";

    const [matches] = await db.execute(query, params);

    // Fetch odds for these matches
    if (matches.length === 0) return res.status(200).json([]);

    const matchIds = matches.map((m) => m.id);
    const [odds] = await db.execute(
      `SELECT match_id, market_name, outcome_name, odds_value 
       FROM match_odds 
       WHERE match_id IN (${matchIds.join(",")})`,
    );

    // Group odds by match and format for frontend
    const result = matches.map((m) => {
      const matchOdds = odds.filter((o) => o.match_id === m.id);
      return {
        id: String(m.id),
        sport: m.sport_slug,
        country: m.country,
        league: m.league_name,
        teams: [
          {
            name: m.home_team_name,
            logo: m.home_team_logo,
            score: m.homeScore,
          },
          {
            name: m.away_team_name,
            logo: m.away_team_logo,
            score: m.awayScore,
          },
        ],
        status: m.status_info,
        isLive: Boolean(m.isLive),
        href: `/sports/${m.sport_slug}/${m.slug}`,
        marketName: matchOdds[0]?.market_name || "1x2",
        outcomes: matchOdds.map((o) => ({
          name: o.outcome_name,
          value: String(o.odds_value),
        })),
      };
    });

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching matches" });
  }
};
