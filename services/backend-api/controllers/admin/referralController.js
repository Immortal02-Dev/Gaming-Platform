const db = require("../../config/db");

// ─────────────────────────────────────────────
// GET /api/admin/referral/agents
// ─────────────────────────────────────────────
exports.getAgents = async (req, res) => {
  try {
    const query = `
      SELECT 
        u.id, 
        u.username, 
        u.is_agent, 
        u.custom_commission,
        rs.total_friends AS direct_referrals,
        rs.total_rewards AS total_earned,
        (SELECT COUNT(*) FROM referral_friends WHERE referrer_id = u.id) AS active_network
      FROM users u
      LEFT JOIN referral_stats rs ON u.id = rs.user_id
      WHERE u.is_agent = 1 OR u.custom_commission IS NOT NULL
      ORDER BY total_earned DESC
    `;

    const [rows] = await db.execute(query);
    res.status(200).json({ data: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching agents" });
  }
};

// ─────────────────────────────────────────────
// PUT /api/admin/referral/agents/:id
// ─────────────────────────────────────────────
exports.updateAgent = async (req, res) => {
  try {
    const { id } = req.params;
    const { is_agent, custom_commission } = req.body;

    const [user] = await db.execute("SELECT id FROM users WHERE id = ?", [id]);
    if (user.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    await db.execute(
      "UPDATE users SET is_agent = ?, custom_commission = ? WHERE id = ?",
      [is_agent ? 1 : 0, custom_commission || null, id]
    );

    // Also ensure referral_stats entry exists
    const [stats] = await db.execute("SELECT user_id FROM referral_stats WHERE user_id = ?", [id]);
    if (stats.length === 0) {
        const defaultCode = "REF-" + id;
        const defaultLink = "http://localhost:3000/referral/" + defaultCode; 
        await db.execute(
            "INSERT INTO referral_stats (user_id, referral_code, referral_link) VALUES (?, ?, ?)",
            [id, defaultCode, defaultLink]
        );
    }

    res.status(200).json({ message: "Agent status updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error updating agent status" });
  }
};

// ─────────────────────────────────────────────
// GET /api/admin/referral/stats (Admin View)
// ─────────────────────────────────────────────
exports.getGlobalReferralStats = async (req, res) => {
    try {
        const query = `
            SELECT 
                COUNT(DISTINCT referrer_id) as active_referrers,
                COUNT(*) as total_referrals,
                (SELECT SUM(amount) FROM referral_rewards WHERE status = 'claimed') as total_commission_paid
            FROM referral_friends
        `;
        const [rows] = await db.execute(query);
        res.status(200).json({ data: rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error fetching global referral stats" });
    }
};
