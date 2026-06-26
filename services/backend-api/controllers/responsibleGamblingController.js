const db = require("../config/db");

// Submit a self-exclusion or cooldown
exports.submitExclusion = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { type, duration_days, reason } = req.body;

    if (!["cooldown", "exclusion"].includes(type)) {
      return res.status(400).json({ success: false, message: "Invalid type" });
    }

    const durationDays = parseInt(duration_days) || 1;
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + durationDays);

    // Check for existing active exclusion
    const [existing] = await db.execute(
      "SELECT id FROM user_self_exclusion WHERE user_id = ? AND end_date > NOW()",
      [userId]
    );

    if (existing.length > 0) {
      return res.status(400).json({ success: false, message: "You already have an active exclusion" });
    }

    await db.execute(
      "INSERT INTO user_self_exclusion (user_id, type, duration_days, end_date, reason) VALUES (?, ?, ?, ?, ?)",
      [userId, type, durationDays, endDate, reason || null]
    );

    res.status(201).json({ success: true, message: "Self-exclusion applied successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get current user's active exclusion
exports.getMyExclusion = async (req, res) => {
  try {
    const userId = req.user?.id;
    const [[row]] = await db.execute(
      "SELECT * FROM user_self_exclusion WHERE user_id = ? AND end_date > NOW() ORDER BY created_at DESC LIMIT 1",
      [userId]
    );
    res.status(200).json({ success: true, data: row || null });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get current user's gambling limits
exports.getMyLimits = async (req, res) => {
  try {
    const userId = req.user?.id;
    const [[row]] = await db.execute(
      "SELECT * FROM user_gambling_limits WHERE user_id = ? LIMIT 1",
      [userId]
    );
    res.status(200).json({ success: true, data: row || null });
  } catch (error) {
    if (error.code === "ER_NO_SUCH_TABLE") {
      return res.status(200).json({ success: true, data: null });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// Set gambling limits
exports.setLimits = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { daily_loss_limit, weekly_loss_limit, monthly_loss_limit, daily_deposit_limit } = req.body;

    await db.execute(
      `INSERT INTO user_gambling_limits (user_id, daily_loss_limit, weekly_loss_limit, monthly_loss_limit, daily_deposit_limit, updated_at)
       VALUES (?, ?, ?, ?, ?, NOW())
       ON DUPLICATE KEY UPDATE
         daily_loss_limit = VALUES(daily_loss_limit),
         weekly_loss_limit = VALUES(weekly_loss_limit),
         monthly_loss_limit = VALUES(monthly_loss_limit),
         daily_deposit_limit = VALUES(daily_deposit_limit),
         updated_at = NOW()`,
      [userId, daily_loss_limit || null, weekly_loss_limit || null, monthly_loss_limit || null, daily_deposit_limit || null]
    );

    res.status(200).json({ success: true, message: "Limits updated" });
  } catch (error) {
    if (error.code === "ER_NO_SUCH_TABLE") {
      return res.status(503).json({ success: false, message: "Gambling limits feature not yet set up" });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};
