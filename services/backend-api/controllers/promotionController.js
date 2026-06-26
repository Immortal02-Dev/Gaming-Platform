const db = require("../config/db");

// ─────────────────────────────────────────────
// GET /api/promotions
// Query params: status (active|archived), category (all|casino|sports|bc-exclusive)
// ─────────────────────────────────────────────
exports.getPromotions = async (req, res) => {
  try {
    const { status = "active", category } = req.query;
    
    let query = "SELECT * FROM promotions WHERE status = ?";
    const params = [status];
    
    if (category && category !== "all") {
      query += " AND category = ?";
      params.push(category);
    }
    
    query += " ORDER BY created_at DESC";
    
    const [rows] = await db.execute(query, params);
    res.status(200).json({ data: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching promotions" });
  }
};

// ─────────────────────────────────────────────
// GET /api/promotions/:slug
// ─────────────────────────────────────────────
exports.getPromotionBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    
    const [rows] = await db.execute(
      "SELECT * FROM promotions WHERE slug = ?",
      [slug]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({ message: "Promotion not found" });
    }
    
    res.status(200).json({ data: rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching promotion" });
  }
};

// ─────────────────────────────────────────────
// GET /api/promotions/daily-contest
// Returns global contest data: prize pool, timer info, and leaderboard
// ─────────────────────────────────────────────
exports.getDailyContest = async (req, res) => {
  try {
    // In a real app, contest_id would be dynamic (e.g., current day's ID)
    const contestId = 1; 
    
    // Get prize pool and timer from the promotions table (where type='daily_contest')
    const [promoRows] = await db.execute(
      "SELECT ends_at, config FROM promotions WHERE type = 'daily_contest' LIMIT 1"
    );
    
    // Get top 10 leaderboard
    const [leaderboard] = await db.execute(
      `SELECT u.username, dcp.wager_amount, dcp.current_rank 
       FROM daily_contest_participants dcp 
       JOIN users u ON dcp.user_id = u.id 
       WHERE dcp.contest_id = ? 
       ORDER BY dcp.current_rank ASC LIMIT 10`,
      [contestId]
    );

    res.status(200).json({
      data: {
        ends_at: promoRows[0]?.ends_at,
        config: promoRows[0]?.config,
        leaderboard: leaderboard
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching daily contest" });
  }
};

// ─────────────────────────────────────────────
// GET /api/promotions/daily-contest/my-stats [PROTECTED]
// ─────────────────────────────────────────────
exports.getMyDailyContestStats = async (req, res) => {
  try {
    const userId = req.user.id;
    const contestId = 1;

    const [rows] = await db.execute(
      "SELECT wager_amount, current_rank FROM daily_contest_participants WHERE user_id = ? AND contest_id = ?",
      [userId, contestId]
    );

    if (rows.length === 0) {
      return res.status(200).json({
        data: { wager_amount: 0, current_rank: "50th+" }
      });
    }

    res.status(200).json({ data: rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching personal contest stats" });
  }
};

// ─────────────────────────────────────────────
// GET /api/promotions/weekly-raffle
// Returns raffle prize pool, draw timer, and total tickets issued
// ─────────────────────────────────────────────
exports.getWeeklyRaffle = async (req, res) => {
  try {
    const raffleId = 1;

    const [promoRows] = await db.execute(
      "SELECT ends_at, config FROM promotions WHERE type = 'weekly_raffle' LIMIT 1"
    );

    const [ticketStats] = await db.execute(
      "SELECT SUM(ticket_count) as total_tickets FROM weekly_raffle_tickets WHERE raffle_id = ?",
      [raffleId]
    );

    res.status(200).json({
      data: {
        ends_at: promoRows[0]?.ends_at,
        config: promoRows[0]?.config,
        total_tickets: ticketStats[0]?.total_tickets || 0
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching weekly raffle" });
  }
};

// ─────────────────────────────────────────────
// GET /api/promotions/weekly-raffle/my-tickets [PROTECTED]
// ─────────────────────────────────────────────
exports.getMyWeeklyRaffleTickets = async (req, res) => {
  try {
    const userId = req.user.id;
    const raffleId = 1;

    const [rows] = await db.execute(
      "SELECT ticket_count FROM weekly_raffle_tickets WHERE user_id = ? AND raffle_id = ?",
      [userId, raffleId]
    );

    res.status(200).json({
      data: { ticket_count: rows[0]?.ticket_count || 0 }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching personal raffle tickets" });
  }
};
