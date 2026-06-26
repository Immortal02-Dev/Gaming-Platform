const db = require("../config/db");

// Helper: get the period date (Monday of current ISO week for weekly quests)
function getWeekStart() {
  const now = new Date();
  const day = now.getUTCDay();
  const diff = day === 0 ? -6 : 1 - day;
  const monday = new Date(now);
  monday.setUTCDate(now.getUTCDate() + diff);
  return monday.toISOString().slice(0, 10);
}

// ─────────────────────────────────────────────
// GET /api/quests
// Query params: type (daily|weekly)
// ─────────────────────────────────────────────
exports.getQuests = async (req, res) => {
  try {
    const { type } = req.query;

    let query = "SELECT * FROM quests WHERE is_active = TRUE";
    const params = [];

    if (type) {
      query += " AND type = ?";
      params.push(type);
    }

    query += " ORDER BY id ASC";

    const [rows] = await db.execute(query, params);
    res.status(200).json({ data: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching quests" });
  }
};

// ─────────────────────────────────────────────
// GET /api/quests/meta
// Returns expiry timestamps for daily & weekly quest periods
// ─────────────────────────────────────────────
exports.getQuestMeta = async (req, res) => {
  try {
    const now = new Date();

    // Daily: expires at end of today (23:59:59 UTC)
    const endOfDay = new Date(now);
    endOfDay.setUTCHours(23, 59, 59, 999);

    // Weekly: expires at end of Sunday
    const day = now.getUTCDay();
    const daysUntilSunday = day === 0 ? 0 : 7 - day;
    const endOfWeek = new Date(now);
    endOfWeek.setUTCDate(now.getUTCDate() + daysUntilSunday);
    endOfWeek.setUTCHours(23, 59, 59, 999);

    res.status(200).json({
      data: {
        daily_expires_at: endOfDay.toISOString(),
        daily_expires_ms: endOfDay.getTime() - Date.now(),
        weekly_expires_at: endOfWeek.toISOString(),
        weekly_expires_ms: endOfWeek.getTime() - Date.now(),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching quest meta" });
  }
};

// ─────────────────────────────────────────────
// GET /api/quests/my-progress [PROTECTED]
// User's progress on all active quests for the current period
// ─────────────────────────────────────────────
exports.getMyProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const weekStart = getWeekStart();

    const [rows] = await db.execute(
      `SELECT uqp.quest_id, uqp.current_value, uqp.status, uqp.period_date,
              q.type, q.title, q.description, q.reward_amount, q.reward_currency, q.goal_value
       FROM user_quest_progress uqp
       JOIN quests q ON uqp.quest_id = q.id
       WHERE uqp.user_id = ?
         AND q.is_active = TRUE
         AND (
           (q.type = 'daily' AND uqp.period_date = CURDATE()) OR
           (q.type = 'weekly' AND uqp.period_date = ?)
         )
       ORDER BY q.type, uqp.id ASC`,
      [userId, weekStart]
    );

    res.status(200).json({ data: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching quest progress" });
  }
};

// ─────────────────────────────────────────────
// GET /api/quests/stats [PROTECTED]
// Total accumulated rewards this week (hero banner)
// ─────────────────────────────────────────────
exports.getQuestStats = async (req, res) => {
  try {
    const userId = req.user.id;
    const weekStart = getWeekStart();

    const [rows] = await db.execute(
      `SELECT COALESCE(SUM(q.reward_amount), 0) AS accumulated_rewards,
              q.reward_currency
       FROM user_quest_progress uqp
       JOIN quests q ON uqp.quest_id = q.id
       WHERE uqp.user_id = ?
         AND uqp.status = 'claimed'
         AND uqp.period_date >= ?
       GROUP BY q.reward_currency`,
      [userId, weekStart]
    );

    res.status(200).json({
      data: {
        accumulated_rewards: rows[0]?.accumulated_rewards || 0,
        currency: rows[0]?.reward_currency || "BCD",
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching quest stats" });
  }
};

// ─────────────────────────────────────────────
// POST /api/quests/:id/claim [PROTECTED]
// Claims reward for a completed quest
// ─────────────────────────────────────────────
exports.claimQuest = async (req, res) => {
  try {
    const userId = req.user.id;
    const questId = req.params.id;
    const weekStart = getWeekStart();

    const [rows] = await db.execute(
      `SELECT uqp.status, q.reward_amount, q.reward_currency, q.type
       FROM user_quest_progress uqp
       JOIN quests q ON uqp.quest_id = q.id
       WHERE uqp.user_id = ? AND uqp.quest_id = ?
         AND (
           (q.type = 'daily' AND uqp.period_date = CURDATE()) OR
           (q.type = 'weekly' AND uqp.period_date = ?)
         )
       LIMIT 1`,
      [userId, questId, weekStart]
    );

    if (rows.length === 0)
      return res.status(404).json({ message: "Quest progress not found" });

    if (rows[0].status !== "completed")
      return res.status(400).json({ message: "Quest not completed or already claimed" });

    const periodDate = rows[0].type === "weekly" ? weekStart : new Date().toISOString().slice(0, 10);

    await db.execute(
      `UPDATE user_quest_progress SET status = 'claimed'
       WHERE user_id = ? AND quest_id = ? AND period_date = ?`,
      [userId, questId, periodDate]
    );

    res.status(200).json({
      message: "Quest reward claimed successfully",
      reward: { amount: rows[0].reward_amount, currency: rows[0].reward_currency },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error claiming quest" });
  }
};

// ─────────────────────────────────────────────
// GET /api/quests/history [PROTECTED]
// Previously completed/claimed quests ("Previous Quests" button)
// ─────────────────────────────────────────────
exports.getQuestHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const [rows] = await db.execute(
      `SELECT uqp.quest_id, uqp.current_value, uqp.status, uqp.period_date,
              q.type, q.title, q.description, q.reward_amount, q.reward_currency, q.goal_value
       FROM user_quest_progress uqp
       JOIN quests q ON uqp.quest_id = q.id
       WHERE uqp.user_id = ?
         AND uqp.status IN ('completed', 'claimed')
         AND uqp.period_date < CURDATE()
       ORDER BY uqp.period_date DESC, uqp.id DESC
       LIMIT 50`,
      [userId]
    );

    res.status(200).json({ data: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching quest history" });
  }
};
