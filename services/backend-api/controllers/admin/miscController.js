const db = require("../../config/db");

// ── Trading ────────────────────────────────────────────────
exports.getTradingRounds = async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT id, symbol as asset, direction, amount, payout, status, created_at 
      FROM trading_trades 
      ORDER BY created_at DESC 
      LIMIT 100
    `);
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── Lottery ───────────────────────────────────────────────
exports.getLotteryDraws = async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT *, draw_time as draw_date,
      CASE 
        WHEN draw_time > NOW() THEN 'open'
        ELSE 'drawn'
      END as status
      FROM lotteries 
      ORDER BY draw_time DESC
    `);
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createLotteryDraw = async (req, res) => {
  try {
    const {
      title,
      slug,
      draw_date,
      prize_pool,
      category,
      icon_src,
      icon_offset_y,
      is_exclusive,
      is_popular,
    } = req.body;
    const finalSlug =
      slug ||
      title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    await db.execute(
      `INSERT INTO lotteries (title, slug, draw_time, prize_pool, category, icon_src, icon_offset_y, is_exclusive, is_popular) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        finalSlug,
        draw_date,
        prize_pool,
        category || "lottery",
        icon_src || null,
        icon_offset_y || 0,
        is_exclusive ? 1 : 0,
        is_popular ? 1 : 0,
      ],
    );
    res.status(201).json({ success: true, message: "Lottery created" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateLotteryDraw = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      slug,
      draw_date,
      prize_pool,
      category,
      icon_src,
      icon_offset_y,
      is_exclusive,
      is_popular,
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
    if (draw_date !== undefined) {
      updates.push("draw_time = ?");
      params.push(draw_date);
    }
    if (prize_pool !== undefined) {
      updates.push("prize_pool = ?");
      params.push(prize_pool);
    }
    if (category !== undefined) {
      updates.push("category = ?");
      params.push(category);
    }
    if (icon_src !== undefined) {
      updates.push("icon_src = ?");
      params.push(icon_src);
    }
    if (icon_offset_y !== undefined) {
      updates.push("icon_offset_y = ?");
      params.push(icon_offset_y);
    }
    if (is_exclusive !== undefined) {
      updates.push("is_exclusive = ?");
      params.push(is_exclusive ? 1 : 0);
    }
    if (is_popular !== undefined) {
      updates.push("is_popular = ?");
      params.push(is_popular ? 1 : 0);
    }

    if (updates.length === 0)
      return res
        .status(400)
        .json({ success: false, message: "No fields to update" });

    params.push(id);
    await db.execute(
      `UPDATE lotteries SET ${updates.join(", ")} WHERE id = ?`,
      params,
    );
    res.status(200).json({ success: true, message: "Lottery updated" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteLotteryDraw = async (req, res) => {
  try {
    const { id } = req.params;
    await db.execute("DELETE FROM lotteries WHERE id = ?", [id]);
    res.status(200).json({ success: true, message: "Lottery deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.triggerLotteryDraw = async (req, res) => {
  const { id } = req.params;

  try {
    // 1. Generate 6 random winning numbers between 1 and 36
    const winningNumbers = [];
    while (winningNumbers.length < 6) {
      const num = Math.floor(Math.random() * 36) + 1;
      if (!winningNumbers.includes(num)) {
        winningNumbers.push(num);
      }
    }
    winningNumbers.sort((a, b) => a - b);

    // 2. Start a transaction
    const connection = await db.getConnection();
    await connection.beginTransaction();

    try {
      // 3. Update the lottery record
      await connection.execute(
        "UPDATE lotteries SET winning_numbers = ?, is_drawn = TRUE WHERE id = ?",
        [JSON.stringify(winningNumbers), id],
      );

      // 4. Fetch all pending bets for this lottery with user VIP info
      const [bets] = await connection.execute(
        `SELECT lb.*, u.vip_level_id 
         FROM lottery_bets lb 
         JOIN users u ON lb.user_id = u.id 
         WHERE lb.lottery_id = ? AND lb.status = 'pending'`,
        [id],
      );

      // 5. Calculate winners and update statuses
      for (const bet of bets) {
        const betNumbers = JSON.parse(bet.balls);
        const matches = betNumbers.filter((num) =>
          winningNumbers.includes(num),
        ).length;

        // Simple win logic: 3 or more matches wins
        // In a real system, you'd calculate the payout based on matches and prize pool
        let status = "lost";
        let payout = 0;

        if (matches >= 3) {
          status = "won";
          const basePayout =
            bet.amount *
            (matches === 3
              ? 2
              : matches === 4
                ? 10
                : matches === 5
                  ? 100
                  : 1000);

          // VIP Multiplier: +2% per level (Level 5 = +10%)
          const vipMultiplier = 1 + bet.vip_level_id * 0.02;
          payout = basePayout * vipMultiplier;
        }

        await connection.execute(
          "UPDATE lottery_bets SET status = ?, payout = ? WHERE id = ?",
          [status, payout, bet.id],
        );
        // Credit user's wallet if status is 'won'
        if (status === "won" && payout > 0) {
          await connection.execute(
            "UPDATE user_balances SET amount = amount + ? WHERE user_id = ? AND currency = 'KRW'",
            [payout, bet.user_id],
          );

          await connection.execute(
            "INSERT INTO wallet_transactions (user_id, type, amount, currency, status, balance_after) VALUES (?, 'lottery_win', ?, 'KRW', 'completed', (SELECT amount FROM user_balances WHERE user_id = ? AND currency = 'KRW'))",
            [bet.user_id, payout, bet.user_id],
          );
        }
      }

      await connection.commit();

      res.status(200).json({
        success: true,
        message: `Draw ${id} completed`,
        data: { winningNumbers },
      });
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error("Lottery Draw Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── Sports ────────────────────────────────────────────────
exports.getSportsMatches = async (req, res) => {
  try {
    const limitNum = parseInt(limit, 10) || 50;
    const pageNum = parseInt(page, 10) || 1;
    const offset = (pageNum - 1) * limitNum;

    let baseQuery = `
      FROM match_events m
      JOIN leagues l ON m.league_id = l.id
      JOIN sports s ON l.sport_id = s.id
      JOIN teams t1 ON m.home_team_id = t1.id
      JOIN teams t2 ON m.away_team_id = t2.id
    `;

    const params = [];
    const whereClauses = [];

    if (status) {
      if (status === "live") {
        whereClauses.push("m.is_live = 1");
      } else if (status === "upcoming") {
        whereClauses.push("m.status = 'upcoming'");
      } else {
        whereClauses.push("m.status = ?");
        params.push(status);
      }
    }

    if (sport) {
      whereClauses.push("s.name = ?");
      params.push(sport);
    }

    if (search) {
      const searchTerm = `%${search}%`;
      whereClauses.push(
        `(t1.name LIKE ? OR t2.name LIKE ? OR l.name LIKE ? OR s.name LIKE ?)`,
      );
      params.push(searchTerm, searchTerm, searchTerm, searchTerm);
    }

    if (whereClauses.length > 0) {
      baseQuery += ` WHERE ${whereClauses.join(" AND ")}`;
    }

    // Count total matches for pagination
    const [[{ total }]] = await db.query(
      `SELECT COUNT(*) as total ${baseQuery}`,
      params,
    );

    // Fetch matches with pagination
    const dataQuery = `
      SELECT 
        m.id, m.status, m.is_live as isLive, m.is_popular, m.home_score as homeScore, m.away_score as awayScore, 
        m.max_bet, m.period_info as status_info, m.slug, m.start_time,
        l.name as league_name,
        s.name as sport_name,
        t1.name as home_team_name,
        t2.name as away_team_name
      ${baseQuery}
      ORDER BY m.start_time DESC
      LIMIT ? OFFSET ?
    `;

    const [rows] = await db.query(dataQuery, [
      ...params,
      limitNum,
      offset,
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

exports.updateSportMatch = async (req, res) => {
  try {
    const { id } = req.params;
    const { is_popular, home_score, away_score, status, max_bet } = req.body;

    const updates = [];
    const params = [];

    if (is_popular !== undefined) {
      updates.push("is_popular = ?");
      params.push(is_popular ? 1 : 0);
    }
    if (home_score !== undefined) {
      updates.push("home_score = ?");
      params.push(home_score);
    }
    if (away_score !== undefined) {
      updates.push("away_score = ?");
      params.push(away_score);
    }
    if (status !== undefined) {
      updates.push("status = ?");
      params.push(status);
    }
    if (max_bet !== undefined) {
      updates.push("max_bet = ?");
      params.push(max_bet);
    }

    if (updates.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No update fields provided" });
    }

    params.push(id);
    await db.execute(
      `UPDATE match_events SET ${updates.join(", ")} WHERE id = ?`,
      params,
    );

    res
      .status(200)
      .json({ success: true, message: "Match updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateMatchOdds = async (req, res) => {
  try {
    const { matchId } = req.params;
    const { oddsId, odds_value, is_overridden } = req.body;

    if (!oddsId || odds_value === undefined) {
      return res.status(400).json({ success: false, message: "Missing odds ID or value" });
    }

    const connection = await db.getConnection();
    try {
      // 1. Get current odds to save as original if not already overridden
      const [current] = await connection.query(
        "SELECT odds_value, original_odds, is_overridden FROM match_odds WHERE id = ?",
        [oddsId]
      );

      if (current.length === 0) throw new Error("Odds record not found");

      let original_odds = current[0].original_odds;
      if (!current[0].is_overridden) {
        original_odds = current[0].odds_value;
      }

      // 2. Update with new value and flag
      await connection.query(
        "UPDATE match_odds SET odds_value = ?, original_odds = ?, is_overridden = ? WHERE id = ?",
        [odds_value, original_odds, is_overridden ? 1 : 0, oddsId]
      );

      res.status(200).json({ success: true, message: "Odds updated successfully" });
    } finally {
      connection.release();
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllSports = async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM sports ORDER BY order_index ASC",
    );
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── Referrals ─────────────────────────────────────────────
exports.getReferralStats = async (req, res) => {
  try {
    const [[stats]] = await db.execute(`
      SELECT 
        COUNT(DISTINCT referrer_id) as active_referrers,
        COUNT(*) as total_referrals,
        SUM(total_commission) as total_commission_paid
      FROM referral_friends
    `);
    res.status(200).json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getReferralRewards = async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT r.*, u.username 
      FROM referral_rewards r
      JOIN users u ON r.user_id = u.id
      ORDER BY r.created_at DESC
      LIMIT 100
    `);
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllReferralFriends = async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT rf.*, u1.username as referrer_username, u2.username as friend_username
      FROM referral_friends rf
      JOIN users u1 ON rf.referrer_id = u1.id
      JOIN users u2 ON rf.friend_user_id = u2.id
      ORDER BY rf.registered_at DESC
      LIMIT 100
    `);
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllReferralCodes = async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT rc.*, u.username
      FROM referral_codes rc
      JOIN users u ON rc.user_id = u.id
      ORDER BY rc.created_at DESC
      LIMIT 100
    `);
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── VIP Management ──────────────────────────────────────────
exports.getAllVipBenefits = async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM vip_benefits ORDER BY display_order ASC",
    );
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateVipBenefit = async (req, res) => {
  const { id } = req.params;
  const { title, description, image_url, display_order } = req.body;
  try {
    const updates = [];
    const params = [];

    if (title !== undefined) {
      updates.push("title = ?");
      params.push(title);
    }
    if (description !== undefined) {
      updates.push("description = ?");
      params.push(description);
    }
    if (image_url !== undefined) {
      updates.push("image_url = ?");
      params.push(image_url);
    }
    if (display_order !== undefined) {
      updates.push("display_order = ?");
      params.push(display_order);
    }

    if (updates.length === 0)
      return res
        .status(400)
        .json({ success: false, message: "No fields to update" });

    params.push(id);
    await db.execute(
      `UPDATE vip_benefits SET ${updates.join(", ")} WHERE id = ?`,
      params,
    );
    res.status(200).json({ success: true, message: "VIP benefit updated" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createVipBenefit = async (req, res) => {
  const { title, description, image_url, display_order } = req.body;
  try {
    await db.execute(
      "INSERT INTO vip_benefits (title, description, image_url, display_order) VALUES (?, ?, ?, ?)",
      [title, description, image_url, display_order || 0],
    );
    res.status(201).json({ success: true, message: "VIP benefit created" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteVipBenefit = async (req, res) => {
  const { id } = req.params;
  try {
    await db.execute("DELETE FROM vip_benefits WHERE id = ?", [id]);
    res.status(200).json({ success: true, message: "VIP benefit deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getVipLevels = async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM vip_levels ORDER BY id ASC");
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateVipLevel = async (req, res) => {
  const { id } = req.params;
  const { name, min_wager } = req.body;
  try {
    const updates = [];
    const params = [];

    if (name !== undefined) {
      updates.push("name = ?");
      params.push(name);
    }
    if (min_wager !== undefined) {
      updates.push("min_wager = ?");
      params.push(min_wager);
    }

    if (updates.length === 0)
      return res
        .status(400)
        .json({ success: false, message: "No fields to update" });

    params.push(id);
    await db.execute(
      `UPDATE vip_levels SET ${updates.join(", ")} WHERE id = ?`,
      params,
    );
    res.status(200).json({ success: true, message: "VIP level updated" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getPlatformSettings = async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT setting_key, setting_value FROM platform_settings",
    );
    const settings = rows.reduce((acc, row) => {
      acc[row.setting_key] = row.setting_value;
      return acc;
    }, {});
    res.status(200).json({ success: true, data: settings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updatePlatformSetting = async (req, res) => {
  const { key } = req.params;
  const { value } = req.body;
  try {
    await db.execute(
      "INSERT INTO platform_settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)",
      [key, value],
    );
    res.status(200).json({ success: true, message: `Setting ${key} updated` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── Sponsorship Management ──────────────────────────────────
exports.getAllSponsorships = async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM sponsorships ORDER BY created_at DESC",
    );
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateSponsorship = async (req, res) => {
  const { id } = req.params;
  const { partner_name, title, logo_url, banner_url, description } = req.body;
  try {
    const updates = [];
    const params = [];

    if (partner_name !== undefined) {
      updates.push("partner_name = ?");
      params.push(partner_name);
    }
    if (title !== undefined) {
      updates.push("title = ?");
      params.push(title);
    }
    if (logo_url !== undefined) {
      updates.push("logo_url = ?");
      params.push(logo_url);
    }
    if (banner_url !== undefined) {
      updates.push("banner_url = ?");
      params.push(banner_url);
    }
    if (description !== undefined) {
      updates.push("description = ?");
      params.push(description);
    }

    if (updates.length === 0)
      return res
        .status(400)
        .json({ success: false, message: "No fields to update" });

    params.push(id);
    await db.execute(
      `UPDATE sponsorships SET ${updates.join(", ")} WHERE id = ?`,
      params,
    );
    res.status(200).json({ success: true, message: "Sponsorship updated" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── Trading Management ──────────────────────────────────────
exports.cancelTradingRound = async (req, res) => {
  const { id } = req.params; // round_id or trade_id depending on how we want to handle it

  try {
    const connection = await db.getConnection();
    await connection.beginTransaction();

    try {
      // For this implementation, we'll assume we are canceling a specific trade/round
      // 1. Get trade details
      const [trades] = await connection.execute(
        "SELECT * FROM trading_trades WHERE id = ?",
        [id],
      );

      if (trades.length === 0) {
        await connection.rollback();
        return res
          .status(404)
          .json({ success: false, message: "Trade not found" });
      }

      const trade = trades[0];
      if (trade.status !== "pending") {
        await connection.rollback();
        return res
          .status(400)
          .json({
            success: false,
            message: "Only pending trades can be canceled",
          });
      }

      // 3. Refund user
      await connection.execute(
        "UPDATE user_balances SET amount = amount + ? WHERE user_id = ? AND currency = ?",
        [trade.amount, trade.user_id, trade.currency],
      );

      // 4. Log transaction
      await connection.execute(
        "INSERT INTO wallet_transactions (user_id, type, amount, currency, status, balance_after) VALUES (?, 'refund', ?, ?, 'completed', (SELECT amount FROM user_balances WHERE user_id = ? AND currency = ?))",
        [
          trade.user_id,
          trade.amount,
          trade.currency,
          trade.user_id,
          trade.currency,
        ],
      );

      await connection.commit();

      res
        .status(200)
        .json({ success: true, message: `Trade ${id} canceled and refunded` });
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── Logging & Monitoring ────────────────────────────────────

exports.getLoginHistory = async (req, res) => {
  try {
    const query = `
      SELECT lh.*, u.username, u.role
      FROM user_login_history lh
      JOIN users u ON lh.user_id = u.id
      ORDER BY lh.created_at DESC
      LIMIT 200
    `;
    const [rows] = await db.execute(query);
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    console.error("getLoginHistory Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getLoginAttempts = async (req, res) => {
  try {
    const [rows] = await db.execute(`
      SELECT * FROM login_attempts 
      WHERE attempts >= 1
      ORDER BY last_attempt DESC 
      LIMIT 100
    `);
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    console.error("getLoginAttempts Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getSystemLogs = async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM system_logs ORDER BY created_at DESC LIMIT 200");
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    console.error("getSystemLogs Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
