const db = require("../config/db");

// ─────────────────────────────────────────────
// GET /api/swap/rates
// ─────────────────────────────────────────────
exports.getSwapRates = async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM swap_rates");
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error fetching swap rates" });
  }
};

// ─────────────────────────────────────────────
// POST /api/swap/execute
// ─────────────────────────────────────────────
exports.executeSwap = async (req, res) => {
  const connection = await db.getConnection();
  try {
    const userId = req.user.id;
    const { from_coin, to_coin, amount } = req.body;

    if (!from_coin || !to_coin || !amount || amount <= 0) {
      return res.status(400).json({ success: false, message: "Invalid swap request" });
    }

    await connection.beginTransaction();

    // 1. Get swap rate
    const [rates] = await connection.execute(
      "SELECT rate, fee_percentage FROM swap_rates WHERE from_coin = ? AND to_coin = ?",
      [from_coin, to_coin]
    );

    if (rates.length === 0) {
      await connection.rollback();
      return res.status(400).json({ success: false, message: "Swap rate not found for this pair" });
    }

    const { rate, fee_percentage } = rates[0];

    // 2. Check user balance
    const [balances] = await connection.execute(
      "SELECT amount FROM user_balances WHERE user_id = ? AND currency = ? FOR UPDATE",
      [userId, from_coin]
    );

    if (balances.length === 0 || balances[0].amount < amount) {
      await connection.rollback();
      return res.status(400).json({ success: false, message: "Insufficient balance" });
    }

    // 3. Calculate received amount
    const fee = (amount * fee_percentage) / 100;
    const amountAfterFee = amount - fee;
    const receiveAmount = amountAfterFee * rate;

    // 4. Update from_coin balance
    await connection.execute(
      "UPDATE user_balances SET amount = amount - ? WHERE user_id = ? AND currency = ?",
      [amount, userId, from_coin]
    );

    // 5. Update to_coin balance (INSERT if not exists)
    await connection.execute(
      `INSERT INTO user_balances (user_id, currency, amount) 
       VALUES (?, ?, ?) 
       ON DUPLICATE KEY UPDATE amount = amount + ?`,
      [userId, to_coin, receiveAmount, receiveAmount]
    );

    // 6. Record transactions
    // Outgoing
    await connection.execute(
      "INSERT INTO wallet_transactions (user_id, type, currency, amount, balance_after) VALUES (?, 'swap', ?, ?, ?)",
      [userId, from_coin, -amount, balances[0].amount - amount]
    );

    // Incoming
    const [toBalance] = await connection.execute(
      "SELECT amount FROM user_balances WHERE user_id = ? AND currency = ?",
      [userId, to_coin]
    );
    await connection.execute(
      "INSERT INTO wallet_transactions (user_id, type, currency, amount, balance_after) VALUES (?, 'swap', ?, ?, ?)",
      [userId, to_coin, receiveAmount, toBalance[0].amount]
    );

    await connection.commit();

    res.status(200).json({
      success: true,
      message: "Swap successful",
      data: {
        from_coin,
        to_coin,
        sent: amount,
        received: receiveAmount,
        fee
      }
    });

  } catch (error) {
    await connection.rollback();
    console.error(error);
    res.status(500).json({ success: false, message: "Server error during swap" });
  } finally {
    connection.release();
  }
};
