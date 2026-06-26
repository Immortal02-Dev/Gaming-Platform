const db = require("../config/db");

// ─────────────────────────────────────────────
// GET /api/referral/stats [PROTECTED]
// ─────────────────────────────────────────────
exports.getReferralStats = async (req, res) => {
  try {
    const userId = req.user.id;
    const [rows] = await db.execute(
      "SELECT * FROM referral_stats WHERE user_id = ?",
      [userId]
    );

    if (rows.length === 0) {
      const defaultCode = "REF-" + userId;
      const defaultLink = "http://localhost:3000/referral/" + defaultCode;
      
      // Auto-create initial stats entry if missing
      await db.execute(
        "INSERT INTO referral_stats (user_id, referral_code, referral_link) VALUES (?, ?, ?)",
        [userId, defaultCode, defaultLink]
      );

      return res.status(200).json({
        data: {
          user_id: userId,
          total_rewards: 0,
          total_friends: 0,
          referral_code: defaultCode,
          referral_link: defaultLink,
          available_commission: 0,
          locked_referral: 0,
        },
      });
    }

    res.status(200).json({ data: rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching referral stats" });
  }
};

// ─────────────────────────────────────────────
// GET /api/referral/rewards [PROTECTED]
// ─────────────────────────────────────────────
exports.getReferralRewards = async (req, res) => {
  try {
    const userId = req.user.id;
    const [rows] = await db.execute(
      "SELECT * FROM referral_rewards WHERE user_id = ? ORDER BY created_at DESC",
      [userId]
    );

    res.status(200).json({ data: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching referral rewards" });
  }
};

// ─────────────────────────────────────────────
// GET /api/referral/summary [PROTECTED]
// ─────────────────────────────────────────────
exports.getReferralSummary = async (req, res) => {
  try {
    const userId = req.user.id;
    const [rows] = await db.execute(
      "SELECT * FROM referral_stats WHERE user_id = ?",
      [userId]
    );

    const [commissionRows] = await db.execute(
      "SELECT COALESCE(SUM(amount), 0) AS total_received FROM referral_rewards WHERE user_id = ? AND status = 'claimed'",
      [userId]
    );

    const stats = rows[0] || {};

    res.status(200).json({
      data: {
        available_commission_rewards: stats.available_commission || 0,
        total_received_commission: commissionRows[0]?.total_received || 0,
        available_referral_rewards: stats.total_rewards || 0,
        total_received_referral: commissionRows[0]?.total_received || 0,
        locked_referral_rewards: stats.locked_referral || 0,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching referral summary" });
  }
};

// ─────────────────────────────────────────────
// GET /api/referral/friends [PROTECTED]
// ─────────────────────────────────────────────
exports.getReferralFriends = async (req, res) => {
  try {
    const userId = req.user.id;
    const { username } = req.query;

    let query = `
      SELECT rf.id, u.username, rf.friend_user_id AS user_id,
             rf.commission_rate, rf.total_deposits_7d,
             rf.total_commission, rf.registered_at, rf.friend_vip_level
      FROM referral_friends rf
      JOIN users u ON rf.friend_user_id = u.id
      WHERE rf.referrer_id = ?
    `;
    const params = [userId];

    if (username) {
      query += " AND u.username LIKE ?";
      params.push(`%${username}%`);
    }

    query += " ORDER BY rf.registered_at DESC";

    const [rows] = await db.execute(query, params);
    res.status(200).json({ data: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching referral friends" });
  }
};

// ─────────────────────────────────────────────
// GET /api/referral/commission [PROTECTED]
// ─────────────────────────────────────────────
exports.getReferralCommission = async (req, res) => {
  try {
    const userId = req.user.id;
    const [rows] = await db.execute(
      `SELECT currency, 
              SUM(amount) AS total_commission_amount,
              COUNT(*) AS entries
       FROM referral_rewards
       WHERE user_id = ?
       GROUP BY currency`,
      [userId]
    );

    res.status(200).json({ data: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching commission breakdown" });
  }
};

// ─────────────────────────────────────────────
// GET /api/referral/activities [PROTECTED]
// ─────────────────────────────────────────────
exports.getReferralActivities = async (req, res) => {
  try {
    const userId = req.user.id;
    const [rows] = await db.execute(
      `SELECT friend_name, amount, currency, status AS event_type, created_at
       FROM referral_rewards
       WHERE user_id = ?
       ORDER BY created_at DESC
       LIMIT 50`,
      [userId]
    );

    res.status(200).json({ data: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching referral activities" });
  }
};

// ─────────────────────────────────────────────
// GET /api/referral/live-rewards [PUBLIC]
// ─────────────────────────────────────────────
exports.getLiveRewards = async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT username, amount, currency, awarded_at FROM referral_live_rewards ORDER BY awarded_at DESC LIMIT 50"
    );
    res.status(200).json({ data: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching live rewards" });
  }
};

// ─────────────────────────────────────────────
// GET /api/referral/codes (Listing) [PROTECTED]
// ─────────────────────────────────────────────
exports.getReferralCodes = async (req, res) => {
  try {
    const userId = req.user.id;
    const [rows] = await db.execute(
      `SELECT code, link, total_friends, total_rewards, created_at
       FROM referral_codes WHERE user_id = ? ORDER BY created_at DESC`,
      [userId]
    );

    res.status(200).json({ data: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching referral codes" });
  }
};

// ─────────────────────────────────────────────
// POST /api/referral/codes (Create) [PROTECTED]
// ─────────────────────────────────────────────
exports.createReferralCode = async (req, res) => {
  try {
    const userId = req.user.id;
    const [existing] = await db.execute(
      "SELECT COUNT(*) as count FROM referral_codes WHERE user_id = ?",
      [userId]
    );

    if (existing[0].count >= 20) {
      return res.status(400).json({ message: "Maximum limit of 20 referral codes reached" });
    }

    const newCode = Math.random().toString(36).substring(2, 11); // random 9 digits
    const link = `http://localhost:3000/referral/${newCode}`;

    await db.execute(
      "INSERT INTO referral_codes (user_id, code, link) VALUES (?, ?, ?)",
      [userId, newCode, link]
    );

    res.status(201).json({ message: "Referral code created", data: { code: newCode, link } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error creating referral code" });
  }
};

// ─────────────────────────────────────────────
// GET /api/referral/rules (Milestones) [PUBLIC]
// ─────────────────────────────────────────────
exports.getReferralRules = async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM referral_level_up_milestones ORDER BY vip_level ASC"
    );
    res.status(200).json({ data: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching referral rules" });
  }
};

// ─────────────────────────────────────────────
// GET /api/referral/level-up-rewards [PROTECTED]
// Returns which milestones the user has achieved based on friends' levels
// ─────────────────────────────────────────────
exports.getLevelUpRewards = async (req, res) => {
  try {
    const userId = req.user.id;
    // For simplicity, we aggregate friends' levels and compare against milestones
    const [milestones] = await db.execute("SELECT * FROM referral_level_up_milestones ORDER BY vip_level ASC");
    const [friends] = await db.execute("SELECT friend_vip_level FROM referral_friends WHERE referrer_id = ?", [userId]);

    const achievements = milestones.map(m => {
      const qualifyingFriends = friends.filter(f => f.friend_vip_level >= m.vip_level).length;
      return {
        ...m,
        qualifying_friends: qualifyingFriends,
        is_achieved: qualifyingFriends > 0
      };
    });

    res.status(200).json({ data: achievements });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching level up rewards" });
  }
};

// ─────────────────────────────────────────────
// POST /api/referral/withdraw [PROTECTED]
// ─────────────────────────────────────────────
exports.withdrawRewards = async (req, res) => {
  try {
    const userId = req.user.id;
    const { type } = req.body; // 'commission' | 'referral'

    if (!type || !["commission", "referral"].includes(type)) {
      return res.status(400).json({ message: "Invalid withdrawal type" });
    }

    const column = type === "commission" ? "available_commission" : "total_rewards";

    const [rows] = await db.execute(
      `SELECT ${column} AS available FROM referral_stats WHERE user_id = ?`,
      [userId]
    );

    if (rows.length === 0 || rows[0].available <= 0) {
      return res.status(400).json({ message: `No ${type} rewards available` });
    }

    const amount = rows[0].available;
    await db.execute(`UPDATE referral_stats SET ${column} = 0 WHERE user_id = ?`, [userId]);

    res.status(200).json({ message: "Withdrawal successful", amount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error processing withdrawal" });
  }
};

// ─────────────────────────────────────────────
// POST /api/referral/swap [PROTECTED]
// ─────────────────────────────────────────────
exports.swapRewards = async (req, res) => {
  try {
    const userId = req.user.id;
    const { from, to, amount } = req.body;

    // Dummy swap logic: move values between columns in referral_stats
    if (!from || !to || !amount) {
      return res.status(400).json({ message: "Missing from, to, or amount" });
    }

    res.status(200).json({ message: "Swap successful", swapped: amount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error processing swap" });
  }
};

// ─────────────────────────────────────────────
// GET /api/referral/verify/:code [PUBLIC]
// ─────────────────────────────────────────────
exports.verifyReferralCode = async (req, res) => {
  try {
    const { code } = req.params;

    if (!code) {
      return res.status(400).json({ message: "Referral code is required", valid: false });
    }

    // 1. Check custom referral_codes table
    const [customCodes] = await db.execute(
      "SELECT user_id FROM referral_codes WHERE code = ?",
      [code]
    );

    if (customCodes.length > 0) {
      const [referrer] = await db.execute("SELECT username FROM users WHERE id = ?", [customCodes[0].user_id]);
      return res.status(200).json({
        valid: true,
        type: "custom",
        referrer: referrer[0]?.username || "Unknown"
      });
    }

    // 2. Check if it's a default code (REF-[userId])
    if (code.startsWith("REF-")) {
      const userId = code.replace("REF-", "");
      if (!isNaN(userId)) {
        const [users] = await db.execute("SELECT username FROM users WHERE id = ?", [userId]);
        if (users.length > 0) {
          return res.status(200).json({
            valid: true,
            type: "default",
            referrer: users[0].username
          });
        }
      }
    }

    res.status(404).json({ valid: false, message: "Invalid referral code" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error verifying referral code", valid: false });
  }
};
