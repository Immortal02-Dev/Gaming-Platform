const db = require("../../config/db");
const { encrypt, decrypt } = require("../../utils/encryption");


// ── Banners ─────────────────────────────────────────────────
exports.getAllBanners = async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM banners ORDER BY sort_order ASC");
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createBanner = async (req, res) => {
  try {
    const { title, description, image, href, gradient_color, sort_order, is_active, is_promo, badge_image } = req.body;
    await db.execute(
      `INSERT INTO banners (title, description, image, href, gradient_color, sort_order, is_active, is_promo, badge_image) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [title || null, description || null, image, href || '/', gradient_color || null, sort_order || 0, is_active ? 1 : 0, is_promo ? 1 : 0, badge_image || null]
    );
    res.status(201).json({ success: true, message: "Banner created" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image, href, gradient_color, is_active, is_promo, sort_order } = req.body;
    
    const updates = [];
    const params = [];
    
    if (title !== undefined) { updates.push("title = ?"); params.push(title); }
    if (description !== undefined) { updates.push("description = ?"); params.push(description); }
    if (image !== undefined) { updates.push("image = ?"); params.push(image); }
    if (href !== undefined) { updates.push("href = ?"); params.push(href); }
    if (gradient_color !== undefined) { updates.push("gradient_color = ?"); params.push(gradient_color); }
    if (is_active !== undefined) { updates.push("is_active = ?"); params.push(is_active ? 1 : 0); }
    if (is_promo !== undefined) { updates.push("is_promo = ?"); params.push(is_promo ? 1 : 0); }
    if (sort_order !== undefined) { updates.push("sort_order = ?"); params.push(sort_order); }
    
    if (updates.length === 0) return res.status(400).json({ success: false, message: "No fields to update" });
    
    params.push(id);
    await db.execute(
      `UPDATE banners SET ${updates.join(', ')} WHERE id = ?`,
      params
    );
    res.status(200).json({ success: true, message: "Banner updated" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;
    await db.execute("DELETE FROM banners WHERE id = ?", [id]);
    res.status(200).json({ success: true, message: "Banner deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── Swap Rates ──────────────────────────────────────────────
exports.getSwapRates = async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM swap_rates ORDER BY id ASC");
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createSwapRate = async (req, res) => {
  try {
    const { from_currency, to_currency, rate, fee_percent, min_amount, max_amount } = req.body;
    await db.execute(
      `INSERT INTO swap_rates (from_currency, to_currency, rate, fee_percent, min_amount, max_amount) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [from_currency, to_currency, rate, fee_percent || 1, min_amount || 0, max_amount || 999999]
    );
    res.status(201).json({ success: true, message: "Swap rate created" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateSwapRate = async (req, res) => {
  try {
    const { id } = req.params;
    const { from_currency, to_currency, rate, fee_percent, min_amount, max_amount } = req.body;
    
    const updates = [];
    const params = [];
    
    if (from_currency !== undefined) { updates.push("from_currency = ?"); params.push(from_currency); }
    if (to_currency !== undefined) { updates.push("to_currency = ?"); params.push(to_currency); }
    if (rate !== undefined) { updates.push("rate = ?"); params.push(rate); }
    if (fee_percent !== undefined) { updates.push("fee_percent = ?"); params.push(fee_percent); }
    if (min_amount !== undefined) { updates.push("min_amount = ?"); params.push(min_amount); }
    if (max_amount !== undefined) { updates.push("max_amount = ?"); params.push(max_amount); }
    
    if (updates.length === 0) return res.status(400).json({ success: false, message: "No fields to update" });
    
    params.push(id);
    await db.execute(
      `UPDATE swap_rates SET ${updates.join(', ')} WHERE id = ?`,
      params
    );
    res.status(200).json({ success: true, message: "Swap rate updated" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteSwapRate = async (req, res) => {
  try {
    const { id } = req.params;
    await db.execute("DELETE FROM swap_rates WHERE id = ?", [id]);
    res.status(200).json({ success: true, message: "Swap rate deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── Vault Oversight ─────────────────────────────────────────
exports.getVaultOverview = async (req, res) => {
  try {
    const [[vaultStats]] = await db.execute(`
      SELECT 
        COUNT(*) as total_users,
        COALESCE(SUM(balance), 0) as total_tvl,
        COALESCE(SUM(total_return), 0) as total_return_paid
      FROM user_vault_stats 
      WHERE balance > 0
    `);

    const [recentTransfers] = await db.execute(`
      SELECT wt.*, u.username
      FROM wallet_transactions wt
      JOIN users u ON wt.user_id = u.id
      WHERE wt.type IN ('vault_in', 'vault_out')
      ORDER BY wt.created_at DESC
      LIMIT 50
    `);

    // Get vault APR from platform_settings
    const [[aprRow]] = await db.execute(
      "SELECT setting_value FROM platform_settings WHERE setting_key = 'vault_apr'"
    );

    res.status(200).json({
      success: true,
      data: {
        total_users: vaultStats.total_users,
        total_tvl: parseFloat(vaultStats.total_tvl) || 0,
        total_return_paid: parseFloat(vaultStats.total_return_paid) || 0,
        vault_apr: aprRow ? aprRow.setting_value : "5",
        recent_transfers: recentTransfers,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── Currencies ──────────────────────────────────────────────
exports.getAllCurrencies = async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM platform_currencies ORDER BY sort_order ASC, symbol ASC");
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createCurrency = async (req, res) => {
  try {
    const { symbol, name, type, icon_url, network, is_enabled, sort_order } = req.body;
    await db.execute(
      `INSERT INTO platform_currencies (symbol, name, type, icon_url, network, is_enabled, sort_order) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [symbol, name, type || 'crypto', icon_url || null, network || null, is_enabled ? 1 : 0, sort_order || 0]
    );
    res.status(201).json({ success: true, message: "Currency created" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateCurrency = async (req, res) => {
  try {
    const { id } = req.params;
    const { symbol, name, type, icon_url, network, is_enabled, sort_order } = req.body;
    
    const updates = [];
    const params = [];
    
    if (symbol !== undefined) { updates.push("symbol = ?"); params.push(symbol); }
    if (name !== undefined) { updates.push("name = ?"); params.push(name); }
    if (type !== undefined) { updates.push("type = ?"); params.push(type); }
    if (icon_url !== undefined) { updates.push("icon_url = ?"); params.push(icon_url); }
    if (network !== undefined) { updates.push("network = ?"); params.push(network); }
    if (is_enabled !== undefined) { updates.push("is_enabled = ?"); params.push(is_enabled ? 1 : 0); }
    if (sort_order !== undefined) { updates.push("sort_order = ?"); params.push(sort_order); }
    
    if (updates.length === 0) return res.status(400).json({ success: false, message: "No fields to update" });
    
    params.push(id);
    await db.execute(
      `UPDATE platform_currencies SET ${updates.join(', ')} WHERE id = ?`,
      params
    );
    res.status(200).json({ success: true, message: "Currency updated" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteCurrency = async (req, res) => {
  try {
    const { id } = req.params;
    await db.execute("DELETE FROM platform_currencies WHERE id = ?", [id]);
    res.status(200).json({ success: true, message: "Currency deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── BC Token Config ─────────────────────────────────────────
const BC_TOKEN_KEYS = [
  "bc_token_price",
  "bc_token_price_change",
  "bc_market_cap",
  "bc_total_supply",
  "bc_circulating_supply",
  "bc_circulating_pct",
  "bc_burnt_supply",
  "bc_burnt_pct",
  "bc_locked_supply",
  "bc_locked_pct",
  "bc_24h_wager",
  "bc_24h_online",
  "bc_24h_bets",
  "bc_24h_won",
];

exports.getBcTokenConfig = async (req, res) => {
  try {
    const placeholders = BC_TOKEN_KEYS.map(() => "?").join(",");
    const [rows] = await db.execute(
      `SELECT setting_key, setting_value FROM platform_settings WHERE setting_key IN (${placeholders})`,
      BC_TOKEN_KEYS
    );
    const config = {};
    for (const key of BC_TOKEN_KEYS) {
      const row = rows.find((r) => r.setting_key === key);
      config[key] = row ? row.setting_value : "";
    }
    res.status(200).json({ success: true, data: config });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateBcTokenConfig = async (req, res) => {
  try {
    const updates = req.body; // { bc_token_price: "0.00704", ... }
    const connection = await db.getConnection();
    await connection.beginTransaction();

    try {
      for (const [key, value] of Object.entries(updates)) {
        if (BC_TOKEN_KEYS.includes(key)) {
          await connection.execute(
            "INSERT INTO platform_settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)",
            [key, String(value)]
          );
        }
      }
      await connection.commit();
      res.status(200).json({ success: true, message: "BC Token config updated" });
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

// ── API Key Management ──────────────────────────────────────
exports.getAllApiKeys = async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT id, provider_name, provider_type, environment, is_active, last_used, created_at FROM platform_api_keys");
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateApiKey = async (req, res) => {
  try {
    const { provider_name, api_key, api_secret, environment, is_active, provider_type } = req.body;
    
    // Encrypt if provided
    const encryptedKey = api_key ? encrypt(api_key) : null;
    const encryptedSecret = api_secret ? encrypt(api_secret) : null;

    const query = `
      INSERT INTO platform_api_keys (provider_name, api_key, api_secret, environment, is_active, provider_type)
      VALUES (?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE 
        api_key = IF(VALUES(api_key) IS NOT NULL, VALUES(api_key), api_key),
        api_secret = IF(VALUES(api_secret) IS NOT NULL, VALUES(api_secret), api_secret),
        environment = VALUES(environment),
        is_active = VALUES(is_active),
        provider_type = VALUES(provider_type)
    `;

    await db.execute(query, [provider_name, encryptedKey, encryptedSecret, environment || 'production', is_active ? 1 : 0, provider_type || null]);
    res.status(200).json({ success: true, message: `API settings for ${provider_name} updated` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteApiKey = async (req, res) => {
  try {
    const { id } = req.params;
    await db.execute("DELETE FROM platform_api_keys WHERE id = ?", [id]);
    res.status(200).json({ success: true, message: "API key removed" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── Language Management ─────────────────────────────────────
exports.getAllLanguages = async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM platform_languages ORDER BY sort_order ASC");
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateLanguage = async (req, res) => {
  try {
    const { id } = req.params;
    const { code, name, is_active, is_default, sort_order } = req.body;
    
    if (is_default) {
      // Unset existing default
      await db.execute("UPDATE platform_languages SET is_default = FALSE");
    }

    if (id === 'new') {
      await db.execute(
        "INSERT INTO platform_languages (code, name, is_active, is_default, sort_order) VALUES (?, ?, ?, ?, ?)",
        [code, name, is_active ? 1 : 0, is_default ? 1 : 0, sort_order || 0]
      );
    } else {
      await db.execute(
        "UPDATE platform_languages SET code = ?, name = ?, is_active = ?, is_default = ?, sort_order = ? WHERE id = ?",
        [code, name, is_active ? 1 : 0, is_default ? 1 : 0, sort_order || 0, id]
      );
    }
    res.status(200).json({ success: true, message: "Language settings updated" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteLanguage = async (req, res) => {
  try {
    const { id } = req.params;
    await db.execute("DELETE FROM platform_languages WHERE id = ?", [id]);
    res.status(200).json({ success: true, message: "Language removed" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── Payment Gateways ────────────────────────────────────────
exports.getPaymentGateways = async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM platform_payment_gateways ORDER BY id ASC");
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updatePaymentGateway = async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      is_active, 
      auto_process, 
      api_key, 
      api_secret, 
      is_sandbox, 
      min_limit, 
      max_limit, 
      fee_percentage,
      supported_currencies
    } = req.body;

    const updates = [];
    const params = [];

    if (is_active !== undefined) { updates.push("is_active = ?"); params.push(is_active ? 1 : 0); }
    if (auto_process !== undefined) { updates.push("auto_process = ?"); params.push(auto_process ? 1 : 0); }
    if (is_sandbox !== undefined) { updates.push("is_sandbox = ?"); params.push(is_sandbox ? 1 : 0); }
    if (api_key !== undefined) { updates.push("api_key = ?"); params.push(api_key ? encrypt(api_key) : null); }
    if (api_secret !== undefined) { updates.push("api_secret = ?"); params.push(api_secret ? encrypt(api_secret) : null); }
    if (min_limit !== undefined) { updates.push("min_limit = ?"); params.push(min_limit); }
    if (max_limit !== undefined) { updates.push("max_limit = ?"); params.push(max_limit); }
    if (fee_percentage !== undefined) { updates.push("fee_percentage = ?"); params.push(fee_percentage); }
    if (supported_currencies !== undefined) { updates.push("supported_currencies = ?"); params.push(JSON.stringify(supported_currencies)); }

    if (updates.length === 0) return res.status(400).json({ success: false, message: "No fields to update" });

    params.push(id);
    await db.execute(
      `UPDATE platform_payment_gateways SET ${updates.join(', ')} WHERE id = ?`,
      params
    );
    res.status(200).json({ success: true, message: "Payment gateway updated" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
