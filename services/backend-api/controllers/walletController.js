const db = require("../config/db");

const getBalances = async (req, res) => {
  try {
    const userId = req.user.id;
    // Fetch main balances
    const [balances] = await db.query(
      "SELECT currency, amount FROM user_balances WHERE user_id = ?",
      [userId]
    );

    // Fetch bonus stats
    const [bonusRows] = await db.query(
      "SELECT total_claimed, locked_bonus FROM user_bonus_stats WHERE user_id = ?",
      [userId]
    );

    const bonusAmount = bonusRows[0] ? parseFloat(bonusRows[0].total_claimed) : 0;

    // Format for frontend
    const formattedBalances = {
      totalBalanceKRW: 0,
      depositBalanceKRW: 0,
      bonusBalanceKRW: bonusAmount,
      assets: balances.map(b => ({
        currency: b.currency,
        type: b.currency === "KRW" ? "fiat" : "crypto",
        amount: parseFloat(b.amount),
        icon: b.currency === "KRW" ? "/assets/images/coin/KRW.rect.png" : `https://bc.game/assets/images/coin/${b.currency}.black.png` // Fallback icon path
      }))
    };

    // Calculate totals if KRW balance exists
    const krw = balances.find(b => b.currency === "KRW");
    if (krw) {
      formattedBalances.totalBalanceKRW = parseFloat(krw.amount) + bonusAmount;
      formattedBalances.depositBalanceKRW = parseFloat(krw.amount);
    }

    res.status(200).json({ success: true, data: formattedBalances });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error fetching wallet balances" });
  }
};

// Deposit APIs
const getCryptoAddress = async (req, res) => {
  try {
    const { currency, network } = req.query;
    const userId = req.user.id;
    
    const [rows] = await db.query(
      "SELECT address FROM crypto_deposit_addresses WHERE user_id = ? AND currency = ? AND network = ?",
      [userId, currency, network]
    );

    if (rows.length > 0) {
      return res.status(200).json({ success: true, data: { address: rows[0].address } });
    }

    // Mock address generation if not found
    const newAddress = `0x${Math.random().toString(16).slice(2, 42)}`;
    await db.query(
      "INSERT INTO crypto_deposit_addresses (user_id, currency, network, address) VALUES (?, ?, ?, ?)",
      [userId, currency, network, newAddress]
    );

    res.status(200).json({ success: true, data: { address: newAddress } });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching crypto address" });
  }
};

const depositFiat = async (req, res) => {
  try {
    const { amount, currency, method } = req.body;
    const userId = req.user.id;

    const [result] = await db.query(
      "INSERT INTO wallet_transactions (user_id, type, amount, currency, status) VALUES (?, 'deposit', ?, ?, 'pending')",
      [userId, amount, currency]
    );

    res.status(200).json({ success: true, data: { transactionId: result.insertId, status: 'pending' } });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error processing fiat deposit" });
  }
};

// Withdraw APIs
const getWithdrawMethods = async (req, res) => {
  // Static list for now, but could be DB driven
  const methods = [
    { id: 'bank_transfer', name: 'Bank Transfer', icon: '/assets/images/bank.png' },
    { id: 'crypto', name: 'Crypto', icon: '/assets/images/crypto.png' }
  ];
  res.status(200).json({ success: true, data: methods });
};

const withdraw = async (req, res) => {
  const connection = await db.getConnection();
  try {
    const { amount, currency, address, method } = req.body;
    const userId = req.user.id;

    await connection.beginTransaction();

    const [balanceRows] = await connection.query(
      "SELECT amount FROM user_balances WHERE user_id = ? AND currency = ? FOR UPDATE",
      [userId, currency]
    );

    if (!balanceRows[0] || balanceRows[0].amount < amount) {
      throw new Error("Insufficient balance");
    }

    await connection.query(
      "UPDATE user_balances SET amount = amount - ? WHERE user_id = ? AND currency = ?",
      [amount, userId, currency]
    );

    const [result] = await connection.query(
      "INSERT INTO wallet_transactions (user_id, type, amount, currency, status, balance_after) VALUES (?, 'withdraw', ?, ?, 'completed', ?)",
      [userId, amount, currency, balanceRows[0].amount - amount]
    );

    await connection.commit();
    res.status(200).json({ success: true, message: "Withdrawal successful", data: { transactionId: result.insertId } });
  } catch (error) {
    await connection.rollback();
    res.status(400).json({ success: false, message: error.message });
  } finally {
    connection.release();
  }
};

// Swap APIs
const getSwapRate = async (req, res) => {
  const { from, to } = req.query;
  // Mock rate: 1 USDT = 1 BCD, 1 KRW = 0.00075 USDT etc.
  let rate = 1;
  if (from === 'USDT' && to === 'BCD') rate = 1;
  if (from === 'KRW' && to === 'USDT') rate = 0.00075;
  
  res.status(200).json({ success: true, data: { rate, from, to } });
};

const swap = async (req, res) => {
  const connection = await db.getConnection();
  try {
    const { fromCurrency, toCurrency, fromAmount, toAmount } = req.body;
    const userId = req.user.id;

    await connection.beginTransaction();

    // Deduct from
    const [fromBal] = await connection.query(
      "SELECT amount FROM user_balances WHERE user_id = ? AND currency = ? FOR UPDATE",
      [userId, fromCurrency]
    );
    if (!fromBal[0] || fromBal[0].amount < fromAmount) throw new Error("Insufficient balance for swap");

    await connection.query(
      "UPDATE user_balances SET amount = amount - ? WHERE user_id = ? AND currency = ?",
      [fromAmount, userId, fromCurrency]
    );

    // Add to
    const [toBal] = await connection.query(
      "SELECT amount FROM user_balances WHERE user_id = ? AND currency = ? FOR UPDATE",
      [userId, toCurrency]
    );
    if (toBal[0]) {
      await connection.query(
        "UPDATE user_balances SET amount = amount + ? WHERE user_id = ? AND currency = ?",
        [toAmount, userId, toCurrency]
      );
    } else {
      await connection.query(
        "INSERT INTO user_balances (user_id, currency, amount) VALUES (?, ?, ?)",
        [userId, toCurrency, toAmount]
      );
    }

    // Log transaction
    await connection.query(
      "INSERT INTO wallet_transactions (user_id, type, amount, currency, status) VALUES (?, 'swap', ?, ?, 'completed')",
      [userId, fromAmount, fromCurrency]
    );

    await connection.commit();
    res.status(200).json({ success: true, message: "Swap successful" });
  } catch (error) {
    await connection.rollback();
    res.status(400).json({ success: false, message: error.message });
  } finally {
    connection.release();
  }
};

// Vault APIs
const getVaultInfo = async (req, res) => {
  try {
    const userId = req.user.id;
    const [rows] = await db.query("SELECT balance, total_return FROM user_vault_stats WHERE user_id = ?", [userId]);
    const [walletRows] = await db.query("SELECT amount FROM user_balances WHERE user_id = ? AND currency = 'KRW'", [userId]);
    
    res.status(200).json({
      success: true,
      data: {
        totalValue: rows[0]?.balance || 0,
        lastDayReturn: (rows[0]?.balance || 0) * 0.0001, // Mock dynamic return
        totalReturn: rows[0]?.total_return || 0,
        vaultBalance: rows[0]?.balance || 0,
        availableBalance: walletRows[0]?.amount || 0,
        apr: "5%"
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching vault info" });
  }
};

const getVaultHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const [rows] = await db.query(
      "SELECT type, currency, amount, created_at as time FROM wallet_transactions WHERE user_id = ? AND type IN ('vault_in', 'vault_out') ORDER BY created_at DESC",
      [userId]
    );
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching vault history" });
  }
};

// History APIs
const getTransactions = async (req, res) => {
  try {
    const userId = req.user.id;
    const { type, asset, time_range } = req.query;
    
    let query = "SELECT type, created_at as time, amount, currency, balance_after as balance FROM wallet_transactions WHERE user_id = ?";
    const params = [userId];

    if (type && type !== 'all') {
      query += " AND type = ?";
      params.push(type.toLowerCase());
    }
    if (asset && asset !== 'All Assets') {
      query += " AND currency = ?";
      params.push(asset.toUpperCase());
    }

    query += " ORDER BY created_at DESC";

    const [rows] = await db.query(query, params);
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching transactions" });
  }
};

const getBetHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const { category, asset, time_range } = req.query;
    
    let query = `
      SELECT b.category as type, b.created_at as time, b.payout, b.profit, b.currency 
      FROM bets b 
      WHERE b.user_id = ?`;
    const params = [userId];

    if (category && category !== 'all') {
      query += " AND b.category = ?";
      params.push(category);
    }
    if (asset && asset !== 'All Assets') {
      query += " AND b.currency = ?";
      params.push(asset.toUpperCase());
    }

    query += " ORDER BY b.created_at DESC";

    const [rows] = await db.query(query, params);
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching bet history" });
  }
};

const getBuyOptions = async (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      fiats: [
        { currency: 'KRW', name: 'South Korean Won', icon: 'https://bc.game/coin/KRW.rect.png' },
        { currency: 'USD', name: 'US Dollar', icon: 'https://bc.game/coin/USD.rect.png' }
      ],
      cryptos: [
        { currency: 'USDT', name: 'Tether', icon: 'https://bc.game/coin/USDT.black.png', network: 'ERC20' },
        { currency: 'BCD', name: 'BC Dollar', icon: 'https://bc.game/coin/BCD.black.png', network: 'ETHEREUM' }
      ]
    }
  });
};

const getBuyEstimate = async (req, res) => {
  const { fiat, crypto, amount } = req.query;
  res.status(200).json({
    success: true,
    data: {
      estimate: amount ? amount * 1.3 : 0, // Mock rate
      fiat,
      crypto
    }
  });
};

const getRollovers = async (req, res) => {
  try {
    const userId = req.user.id;
    const [rows] = await db.query(
      "SELECT task_name as type, '2024-03-17' as time, reward_amount as amount, status FROM user_tasks WHERE user_id = ?",
      [userId]
    );
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error fetching rollovers" });
  }
};
const vaultTransferIn = async (req, res) => {
  const connection = await db.getConnection();
  try {
    const { amount, currency } = req.body;
    const userId = req.user.id;

    await connection.beginTransaction();

    const [walBal] = await connection.query(
      "SELECT amount FROM user_balances WHERE user_id = ? AND currency = ? FOR UPDATE",
      [userId, currency]
    );
    if (!walBal[0] || walBal[0].amount < amount) throw new Error("Insufficient wallet balance");

    await connection.query(
      "UPDATE user_balances SET amount = amount - ? WHERE user_id = ? AND currency = ?",
      [amount, userId, currency]
    );

    await connection.query(
      "UPDATE user_vault_stats SET balance = balance + ? WHERE user_id = ?",
      [amount, userId]
    );

    await connection.query(
      "INSERT INTO wallet_transactions (user_id, type, amount, currency, status) VALUES (?, 'vault_in', ?, ?, 'completed')",
      [userId, amount, currency]
    );

    await connection.commit();
    res.status(200).json({ success: true, message: "Transferred to Vault" });
  } catch (error) {
    await connection.rollback();
    res.status(400).json({ success: false, message: error.message });
  } finally {
    connection.release();
  }
};

const vaultTransferOut = async (req, res) => {
  const connection = await db.getConnection();
  try {
    const { amount, currency } = req.body;
    const userId = req.user.id;

    await connection.beginTransaction();

    const [vltBal] = await connection.query(
      "SELECT balance FROM user_vault_stats WHERE user_id = ? FOR UPDATE",
      [userId]
    );
    if (!vltBal[0] || vltBal[0].balance < amount) throw new Error("Insufficient vault balance");

    await connection.query(
      "UPDATE user_vault_stats SET balance = balance - ? WHERE user_id = ?",
      [amount, userId]
    );

    await connection.query(
      "UPDATE user_balances SET amount = amount + ? WHERE user_id = ? AND currency = ?",
      [amount, userId, currency]
    );

    await connection.query(
      "INSERT INTO wallet_transactions (user_id, type, amount, currency, status) VALUES (?, 'vault_out', ?, ?, 'completed')",
      [userId, amount, currency]
    );

    await connection.commit();
    res.status(200).json({ success: true, message: "Withdrawn from Vault" });
  } catch (error) {
    await connection.rollback();
    res.status(400).json({ success: false, message: error.message });
  } finally {
    connection.release();
  }
};

module.exports = {
  getBalances,
  getCryptoAddress,
  depositFiat,
  getWithdrawMethods,
  withdraw,
  getSwapRate,
  swap,
  getVaultInfo,
  getVaultHistory,
  vaultTransferIn,
  vaultTransferOut,
  getTransactions,
  getBetHistory,
  getBuyOptions,
  getBuyEstimate,
  getRollovers
};
