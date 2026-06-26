const db = require("../config/db");

/**
 * Universal Webhook Handler
 * Logs all incoming payloads and optionally processes transactions
 */
exports.handleWebhook = async (req, res) => {
  const { provider } = req.params;
  const payload = req.body;

  console.log(`[Webhook] Received from ${provider}:`, payload);

  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    // 1. Log the webhook
    // Map common fields from different providers (mock implementation)
    let eventType = payload.event || payload.type || 'deposit';
    let externalTxId = payload.transaction_id || payload.txid || payload.id || 'unknown';
    let status = (payload.status === 'success' || payload.status === 'completed' || payload.status === 'confirmed') ? 'success' : 'pending';

    const [logResult] = await connection.execute(
      `INSERT INTO payment_webhook_logs (provider_name, event_type, transaction_id, status, raw_payload) 
       VALUES (?, ?, ?, ?, ?)`,
      [provider, eventType, String(externalTxId), status, JSON.stringify(payload)]
    );

    const logId = logResult.insertId;

    // 2. Check Gateway for Auto-Process status
    const [gateways] = await connection.query(
        "SELECT * FROM platform_payment_gateways WHERE provider_name = ? AND is_active = 1",
        [provider]
    );

    if (gateways.length > 0 && gateways[0].auto_process && status === 'success' && eventType === 'deposit') {
        // Attempt to find or create the transaction
        // This part needs specific provider mapping logic (e.g. metadata with user_id)
        const userId = payload.custom_user_id || payload.metadata?.user_id;
        const amount = payload.amount || payload.value;
        const currency = payload.currency || 'USD';

        if (userId && amount) {
            // Find existing pending transaction if any
            const [existing] = await connection.query(
                "SELECT * FROM wallet_transactions WHERE tx_hash = ? AND status = 'pending'",
                [String(externalTxId)]
            );

            if (existing.length > 0) {
                const trans = existing[0];
                // Update to completed
                await connection.query(
                    "UPDATE wallet_transactions SET status = 'completed' WHERE id = ?",
                    [trans.id]
                );

                // Update balance
                await connection.query(
                    "UPDATE user_balances SET amount = amount + ? WHERE user_id = ? AND currency = ?",
                    [trans.amount, trans.user_id, trans.currency]
                );
            } else {
                // Create new transaction and update balance
                const [userRows] = await connection.query("SELECT id FROM users WHERE id = ?", [userId]);
                if (userRows.length > 0) {
                    const [res] = await connection.query(
                        "INSERT INTO wallet_transactions (user_id, type, currency, amount, status, tx_hash) VALUES (?, 'deposit', ?, ?, 'completed', ?)",
                        [userId, currency, amount, externalTxId]
                    );

                    // Upsert balance
                    const [bal] = await connection.query(
                        "SELECT amount FROM user_balances WHERE user_id = ? AND currency = ? FOR UPDATE",
                        [userId, currency]
                    );

                    if (bal.length > 0) {
                        await connection.query(
                            "UPDATE user_balances SET amount = amount + ? WHERE user_id = ? AND currency = ?",
                            [amount, userId, currency]
                        );
                    } else {
                        await connection.query(
                            "INSERT INTO user_balances (user_id, currency, amount) VALUES (?, ?, ?)",
                            [userId, currency, amount]
                        );
                    }
                }
            }

            // Mark log as processed
            await connection.query(
                "UPDATE payment_webhook_logs SET processed = 1 WHERE id = ?",
                [logId]
            );
        }
    }

    await connection.commit();
    res.status(200).json({ success: true, message: "Webhook received" });
  } catch (error) {
    await connection.rollback();
    console.error("[Webhook Error]:", error);
    res.status(500).json({ success: false, message: error.message });
  } finally {
    connection.release();
  }
};
