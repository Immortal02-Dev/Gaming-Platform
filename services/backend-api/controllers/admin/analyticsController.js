const db = require("../../config/db");

// ── Financial Analytics ──────────────────────────────────────

exports.getRevenueStats = async (req, res) => {
  const { period = "30" } = req.query; // Default to 30 days
  try {
    const [rows] = await db.execute(
      `
      SELECT 
        DATE(created_at) as date,
        SUM(amount) as total_bets,
        SUM(payout) as total_payouts,
        (SUM(amount) - SUM(payout)) as ggr
      FROM bets
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
      GROUP BY DATE(created_at)
      ORDER BY DATE(created_at) ASC
    `,
      [period],
    );
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getFinancialFlow = async (req, res) => {
  const { period = "30" } = req.query;
  try {
    const [rows] = await db.execute(
      `
      SELECT 
        DATE(created_at) as date,
        SUM(CASE WHEN type = 'deposit' THEN amount ELSE 0 END) as deposits,
        SUM(CASE WHEN type = 'withdraw' THEN amount ELSE 0 END) as withdrawals
      FROM wallet_transactions
      WHERE status = 'completed'
        AND created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
      GROUP BY DATE(created_at)
      ORDER BY DATE(created_at) ASC
    `,
      [period],
    );
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── Game Analytics ───────────────────────────────────────────

exports.getGamePerformance = async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT 
        g.id,
        g.title,
        g.category,
        p.name as provider_name,
        COUNT(b.id) as total_bets_count,
        SUM(b.amount) as total_volume,
        SUM(b.payout) as total_payout,
        (SUM(b.amount) - SUM(b.payout)) as house_profit,
        COUNT(DISTINCT b.user_id) as unique_players
      FROM games g
      LEFT JOIN providers p ON g.provider_id = p.id
      LEFT JOIN bets b ON g.id = b.game_id
      GROUP BY g.id
      ORDER BY total_volume DESC
      LIMIT 100
    `);
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── User Analytics ───────────────────────────────────────────

exports.getUserStats = async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT 
        DATE(created_at) as date,
        COUNT(*) as registrations
      FROM users
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
      GROUP BY DATE(created_at)
      ORDER BY DATE(created_at) ASC
    `);
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getTopPlayers = async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT 
        u.id,
        u.username,
        u.email_or_phone,
        COUNT(b.id) as bet_count,
        SUM(b.amount) as total_wagered,
        SUM(b.payout) as total_won,
        (SUM(b.payout) - SUM(b.amount)) as net_profit
      FROM users u
      JOIN bets b ON u.id = b.user_id
      GROUP BY u.id
      ORDER BY total_wagered DESC
      LIMIT 50
    `);
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getActivityStats = async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT 
        HOUR(created_at) as hour,
        COUNT(DISTINCT user_id) as active_users
      FROM bets
      WHERE created_at >= DATE_SUB(NOW(), INTERVAL 1 DAY)
      GROUP BY HOUR(created_at)
      ORDER BY HOUR(created_at) ASC
    `);
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── Security & Fraud Analytics ───────────────────────────────

exports.getSecurityAlerts = async (req, res) => {
  try {
    // 1. Multiple accounts on same IP
    const [ipAlerts] = await db.execute(`
      SELECT last_ip_address, COUNT(*) as account_count, GROUP_CONCAT(username) as accounts
      FROM users
      WHERE last_ip_address IS NOT NULL
      GROUP BY last_ip_address
      HAVING account_count > 1
    `);

    // 2. Abnormal win rates (> 200% on > 100 bets)
    const [winRateAlerts] = await db.execute(`
      SELECT 
        u.username,
        COUNT(b.id) as bet_count,
        SUM(b.amount) as total_wagered,
        SUM(b.payout) as total_won,
        (SUM(b.payout) / SUM(b.amount) * 100) as win_percentage
      FROM users u
      JOIN bets b ON u.id = b.user_id
      GROUP BY u.id
      HAVING bet_count > 50 AND win_percentage > 180
      ORDER BY win_percentage DESC
    `);

    res.status(200).json({
      success: true,
      data: {
        ipAlerts,
        winRateAlerts,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
