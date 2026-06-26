const db = require("../../config/db");

// ── Promotions ───────────────────────────────────────────────

exports.getAllPromotions = async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM promotions ORDER BY created_at DESC",
    );
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createPromotion = async (req, res) => {
  try {
    const { title, description, image, href, category, status, type, ends_at } =
      req.body;
    const slug = title.toLowerCase().replace(/ /g, "-") + "-" + Date.now();
    await db.execute(
      "INSERT INTO promotions (title, slug, description, image, href, category, status, type, ends_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [title, slug, description, image, href, category, status, type, ends_at],
    );
    res.status(201).json({ success: true, message: "Promotion created" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updatePromotion = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image, href, category, status, type, ends_at } = req.body;

    const updates = [];
    const params = [];

    if (title !== undefined) { updates.push("title = ?"); params.push(title); }
    if (description !== undefined) { updates.push("description = ?"); params.push(description); }
    if (image !== undefined) { updates.push("image = ?"); params.push(image); }
    if (href !== undefined) { updates.push("href = ?"); params.push(href); }
    if (category !== undefined) { updates.push("category = ?"); params.push(category); }
    if (status !== undefined) { updates.push("status = ?"); params.push(status); }
    if (type !== undefined) { updates.push("type = ?"); params.push(type); }
    if (ends_at !== undefined) { updates.push("ends_at = ?"); params.push(ends_at); }

    if (updates.length === 0) return res.status(400).json({ success: false, message: "No fields to update" });

    params.push(id);
    await db.execute(
      `UPDATE promotions SET ${updates.join(', ')} WHERE id = ?`,
      params
    );

    res.status(200).json({ success: true, message: "Promotion updated" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deletePromotion = async (req, res) => {
  try {
    const { id } = req.params;
    await db.execute("DELETE FROM promotions WHERE id = ?", [id]);
    res.status(200).json({ success: true, message: "Promotion deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── Quests ────────────────────────────────────────────────────

exports.getAllQuests = async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM quests ORDER BY created_at DESC",
    );
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createQuest = async (req, res) => {
  try {
    const {
      type,
      title,
      description,
      reward_amount,
      reward_currency,
      goal_value,
      is_active,
    } = req.body;
    await db.execute(
      "INSERT INTO quests (type, title, description, reward_amount, reward_currency, goal_value, is_active) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        type,
        title,
        description,
        reward_amount,
        reward_currency,
        goal_value,
        is_active ? 1 : 0,
      ],
    );
    res.status(201).json({ success: true, message: "Quest created" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateQuest = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, title, description, reward_amount, reward_currency, goal_value, is_active } = req.body;
    
    const updates = [];
    const params = [];
    
    if (type !== undefined) { updates.push("type = ?"); params.push(type); }
    if (title !== undefined) { updates.push("title = ?"); params.push(title); }
    if (description !== undefined) { updates.push("description = ?"); params.push(description); }
    if (reward_amount !== undefined) { updates.push("reward_amount = ?"); params.push(reward_amount); }
    if (reward_currency !== undefined) { updates.push("reward_currency = ?"); params.push(reward_currency); }
    if (goal_value !== undefined) { updates.push("goal_value = ?"); params.push(goal_value); }
    if (is_active !== undefined) { updates.push("is_active = ?"); params.push(is_active ? 1 : 0); }
    
    if (updates.length === 0) return res.status(400).json({ success: false, message: "No fields to update" });
    
    params.push(id);
    await db.execute(
      `UPDATE quests SET ${updates.join(', ')} WHERE id = ?`,
      params
    );
    res.status(200).json({ success: true, message: "Quest updated" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteQuest = async (req, res) => {
  try {
    const { id } = req.params;
    await db.execute("DELETE FROM quests WHERE id = ?", [id]);
    res.status(200).json({ success: true, message: "Quest deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── Bonus & Rewards Oversight ───────────────────────────────

exports.getGlobalBonusStats = async (req, res) => {
  try {
    const [[stats]] = await db.execute(`
      SELECT 
        SUM(total_claimed) as total_claimed,
        SUM(vip_bonus) as total_vip_bonus,
        SUM(locked_bonus) as total_locked_bonus,
        COUNT(DISTINCT user_id) as users_with_bonus
      FROM user_bonus_stats
    `);
    res.status(200).json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllPromoCodes = async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM promo_codes ORDER BY created_at DESC",
    );
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createPromoCode = async (req, res) => {
  const { code, reward_type, reward_amount, max_uses, expires_at } = req.body;
  try {
    await db.execute(
      "INSERT INTO promo_codes (code, reward_type, reward_amount, max_uses, expires_at) VALUES (?, ?, ?, ?, ?)",
      [code, reward_type, reward_amount, max_uses, expires_at],
    );
    res.status(201).json({ success: true, message: "Promo code created" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deletePromoCode = async (req, res) => {
  const { id } = req.params;
  try {
    await db.execute("DELETE FROM promo_codes WHERE id = ?", [id]);
    res.status(200).json({ success: true, message: "Promo code deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updatePromoCode = async (req, res) => {
  try {
    const { id } = req.params;
    const { code, reward_type, reward_amount, max_uses, expires_at } = req.body;

    const updates = [];
    const params = [];

    if (code !== undefined) { updates.push("code = ?"); params.push(code); }
    if (reward_type !== undefined) { updates.push("reward_type = ?"); params.push(reward_type); }
    if (reward_amount !== undefined) { updates.push("reward_amount = ?"); params.push(reward_amount); }
    if (max_uses !== undefined) { updates.push("max_uses = ?"); params.push(max_uses); }
    if (expires_at !== undefined) { updates.push("expires_at = ?"); params.push(expires_at); }

    if (updates.length === 0) return res.status(400).json({ success: false, message: "No fields to update" });

    params.push(id);
    await db.execute(
      `UPDATE promo_codes SET ${updates.join(', ')} WHERE id = ?`,
      params
    );

    res.status(200).json({ success: true, message: "Promo code updated" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
