const db = require("../config/db");

// ─────────────────────────────────────────────
// GET /api/bonus/stats  [PROTECTED]
// ─────────────────────────────────────────────
exports.getBonusStats = async (req, res) => {
  try {
    const userId = req.user.id;
    const [rows] = await db.execute(
      "SELECT * FROM user_bonus_stats WHERE user_id = ?",
      [userId]
    );

    if (rows.length === 0) {
      // Default empty stats if not found
      return res.status(200).json({
        data: {
          user_id: userId,
          total_claimed: 0,
          vip_bonus: 0,
          special_bonus: 0,
          general_bonus: 0,
          locked_bonus: 0,
          deposit_bonus_progress: 0,
        },
      });
    }

    res.status(200).json({ data: rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching bonus stats" });
  }
};

// ─────────────────────────────────────────────
// POST /api/bonus/redeem [PROTECTED]
// ─────────────────────────────────────────────
exports.redeemPromoCode = async (req, res) => {
  try {
    const { code } = req.body;
    const userId = req.user.id;

    if (!code) return res.status(400).json({ message: "Promo code required" });

    const [promoRows] = await db.execute("SELECT * FROM promo_codes WHERE code = ?", [code]);
    if (promoRows.length === 0) return res.status(404).json({ message: "Invalid promo code" });

    const promo = promoRows[0];
    if (promo.current_uses >= promo.max_uses) return res.status(400).json({ message: "Promo code expired or max uses reached" });

    // Check if already redeemed
    const [redemptionRows] = await db.execute("SELECT * FROM promo_code_redemptions WHERE user_id = ? AND promo_code_id = ?", [userId, promo.id]);
    if (redemptionRows.length > 0) return res.status(400).json({ message: "You have already redeemed this promo code" });

    // Redeem
    await db.execute("INSERT INTO promo_code_redemptions (user_id, promo_code_id) VALUES (?, ?)", [userId, promo.id]);
    await db.execute("UPDATE promo_codes SET current_uses = current_uses + 1 WHERE id = ?", [promo.id]);

    res.status(200).json({ message: "Promo code redeemed successfully", reward: { type: promo.reward_type, amount: promo.reward_amount } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error redeeming promo code" });
  }
};

// ─────────────────────────────────────────────
// GET /api/bonus/rakeback [PROTECTED]
// ─────────────────────────────────────────────
exports.getRakeback = async (req, res) => {
  try {
    const userId = req.user.id;
    const [rows] = await db.execute("SELECT * FROM user_rakeback WHERE user_id = ?", [userId]);
    
    if (rows.length === 0) {
      return res.status(200).json({ data: { locked_bcd: 0, unlock_rate: 0, ready_to_claim: 0, next_claim_time: null } });
    }
    res.status(200).json({ data: rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching rakeback" });
  }
};

// ─────────────────────────────────────────────
// POST /api/bonus/rakeback/claim [PROTECTED]
// ─────────────────────────────────────────────
exports.claimRakeback = async (req, res) => {
  try {
    const userId = req.user.id;
    const [rows] = await db.execute("SELECT ready_to_claim FROM user_rakeback WHERE user_id = ?", [userId]);
    
    if (rows.length === 0 || rows[0].ready_to_claim <= 0) {
      return res.status(400).json({ message: "No rakeback ready to claim" });
    }

    const amount = rows[0].ready_to_claim;
    await db.execute("UPDATE user_rakeback SET ready_to_claim = 0 WHERE user_id = ?", [userId]);
    
    // In a real app, update user balance here

    res.status(200).json({ message: "Rakeback claimed successfully", amount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error claiming rakeback" });
  }
};

// ─────────────────────────────────────────────
// GET /api/bonus/tasks [PROTECTED]
// ─────────────────────────────────────────────
exports.getTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const [rows] = await db.execute("SELECT * FROM user_tasks WHERE user_id = ?", [userId]);
    res.status(200).json({ data: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching tasks" });
  }
};

// ─────────────────────────────────────────────
// POST /api/bonus/tasks/claim [PROTECTED]
// ─────────────────────────────────────────────
exports.claimTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const { taskId } = req.body;

    const [rows] = await db.execute("SELECT status, reward_amount FROM user_tasks WHERE id = ? AND user_id = ?", [taskId, userId]);
    if (rows.length === 0) return res.status(404).json({ message: "Task not found" });

    if (rows[0].status !== 'completed') return res.status(400).json({ message: "Task is not completed yet or already claimed" });

    await db.execute("UPDATE user_tasks SET status = 'claimed' WHERE id = ? AND user_id = ?", [taskId, userId]);
    // Note: add reward_amount to user balance in a real app

    res.status(200).json({ message: "Task reward claimed successfully", amount: rows[0].reward_amount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error claiming task" });
  }
};

// ─────────────────────────────────────────────
// GET /api/bonus/spin/status [PROTECTED]
// ─────────────────────────────────────────────
exports.getSpinStatus = async (req, res) => {
  try {
    const userId = req.user.id;
    const [rows] = await db.execute("SELECT daily_spins_available, last_spin_time FROM user_spins WHERE user_id = ?", [userId]);
    
    if (rows.length === 0) {
      return res.status(200).json({ data: { daily_spins_available: 0, last_spin_time: null, vip_spin_available: false } });
    }
    
    res.status(200).json({ data: { ...rows[0], vip_spin_available: true } }); // Mocking VIP spin for UI purposes
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching spin status" });
  }
};

// ─────────────────────────────────────────────
// POST /api/bonus/spin/roll [PROTECTED]
// ─────────────────────────────────────────────
exports.rollSpin = async (req, res) => {
  try {
    const userId = req.user.id;
    const [rows] = await db.execute("SELECT daily_spins_available FROM user_spins WHERE user_id = ?", [userId]);
    
    if (rows.length === 0 || rows[0].daily_spins_available <= 0) {
      return res.status(400).json({ message: "No spins available" });
    }

    await db.execute("UPDATE user_spins SET daily_spins_available = daily_spins_available - 1, last_spin_time = NOW() WHERE user_id = ?", [userId]);
    
    // Random mock prize
    const mockPrize = { type: 'BCD', amount: 10.00 };

    res.status(200).json({ message: "Spin successful", prize: mockPrize });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error rolling spin" });
  }
};

// ─────────────────────────────────────────────
// GET /api/bonus/vault/stats [PROTECTED]
// ─────────────────────────────────────────────
exports.getVaultStats = async (req, res) => {
  try {
    const userId = req.user.id;
    const [rows] = await db.execute("SELECT balance, total_return FROM user_vault_stats WHERE user_id = ?", [userId]);
    
    if (rows.length === 0) {
      return res.status(200).json({ data: { balance: 0, total_return: 0 } });
    }
    
    res.status(200).json({ data: rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error fetching vault stats" });
  }
};
