import db from "../config/db";
import bcrypt from "bcrypt";

async function seed() {
  console.log("🌱 Starting realistic data seeding...");

  try {
    // 1. Generate Users (Regular users)
    console.log("👤 Seeding users...");
    const passwordHash = await bcrypt.hash("User@123456", 10);
    const users = [
      ["johndoe@example.com", "johndoe", passwordHash, "USR100", 2, 5420.5],
      ["janedoe@example.com", "janedoe", passwordHash, "USR101", 1, 1200.0],
      [
        "crypto_whale@gmail.com",
        "WhaleWatcher",
        passwordHash,
        "WHALE",
        5,
        850400.0,
      ],
      ["luckygambler@yahoo.com", "LuckyStrike", passwordHash, null, 3, 28000.0],
      [
        "pro_trader@outlook.com",
        "ChartMaster",
        passwordHash,
        "TRADER",
        4,
        115000.0,
      ],
      ["betty_boop@gmail.com", "BettyB", passwordHash, null, 0, 50.0],
      [
        "high_roller@example.com",
        "HighRoller",
        passwordHash,
        "VIP",
        4,
        210000.0,
      ],
      ["casual_gamer@example.com", "CasualG", passwordHash, null, 1, 800.0],
      ["lottery_fan@example.com", "LottoKing", passwordHash, null, 2, 6000.0],
      [
        "sports_fanatic@example.com",
        "GoalGetter",
        passwordHash,
        "SPORTS",
        2,
        4500.0,
      ],
    ];

    for (const u of users) {
      await db.query(
        "INSERT IGNORE INTO users (email_or_phone, username, password, referral_code, vip_level_id, total_wagered) VALUES (?, ?, ?, ?, ?, ?)",
        u,
      );
    }

    // Get user IDs
    const [userRows]: any = await db.query(
      "SELECT id, username FROM users WHERE role = 'user' or role IS NULL",
    );
    const userIds = userRows.map((r: any) => r.id);

    // 2. Ensure Trading Markets exist
    console.log("📈 Seeding trading markets...");
    const markets = [
      ["BTC", "Bitcoin", 68500.5, 2.5, "crypto"],
      ["ETH", "Ethereum", 3500.2, 1.2, "crypto"],
      ["SOL", "Solana", 145.3, -3.1, "crypto"],
      ["BNB", "Binance Coin", 580.1, 0.5, "crypto"],
      ["XAU", "Gold", 2150.7, -0.2, "commodity"],
      ["AAPL", "Apple Inc.", 175.2, 1.1, "stock"],
    ];
    for (const m of markets) {
      await db.query(
        "INSERT INTO trading_markets (symbol, name, price, change_24h, type) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE price = VALUES(price), change_24h = VALUES(change_24h)",
        m,
      );
    }

    // 3. Generate Balances
    console.log("💰 Seeding user balances...");
    const currencies = ["USDT", "BTC", "ETH", "BCD", "TRX"];
    for (const userId of userIds) {
      for (const currency of currencies) {
        const amount =
          currency === "BTC" ? Math.random() * 0.5 : Math.random() * 5000;
        await db.query(
          "INSERT INTO user_balances (user_id, currency, amount) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE amount = VALUES(amount)",
          [userId, currency, amount],
        );
      }
    }

    // 4. Generate Wallet Transactions
    console.log("💸 Seeding wallet transactions...");
    const txTypes = ["deposit", "withdraw", "bonus", "transfer"];
    for (let i = 0; i < 50; i++) {
      const userId = userIds[Math.floor(Math.random() * userIds.length)];
      const type = txTypes[Math.floor(Math.random() * txTypes.length)];
      const currency =
        currencies[Math.floor(Math.random() * currencies.length)];
      const amount = (Math.random() * 1000).toFixed(2);
      const status = Math.random() > 0.1 ? "completed" : "pending";

      await db.query(
        "INSERT INTO wallet_transactions (user_id, type, currency, amount, balance_after, status, tx_hash) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          userId,
          type,
          currency,
          amount,
          5000.0,
          status,
          "0x" + Math.random().toString(16).slice(2),
        ],
      );
    }

    // 5. Generate Bets (Casino)
    console.log("🎮 Seeding casino bets...");
    const [gameRows]: any = await db.query(
      "SELECT id, category FROM games LIMIT 20",
    );
    if (gameRows.length > 0) {
      for (let i = 0; i < 100; i++) {
        const userId = userIds[Math.floor(Math.random() * userIds.length)];
        const game = gameRows[Math.floor(Math.random() * gameRows.length)];
        const amount = (Math.random() * 100).toFixed(2);
        const win = Math.random() > 0.6;
        const payout = win
          ? (parseFloat(amount) * (1.5 + Math.random())).toFixed(2)
          : 0;
        const profit = (
          parseFloat(payout.toString()) - parseFloat(amount)
        ).toFixed(2);
        const status = win ? "won" : "lost";

        await db.query(
          "INSERT INTO bets (user_id, game_id, amount, currency, payout, profit, category, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW() - INTERVAL ? MINUTE)",
          [
            userId,
            game.id,
            amount,
            "USDT",
            payout,
            profit,
            game.category,
            status,
            Math.floor(Math.random() * 10000),
          ],
        );
      }
    }

    // 6. Generate Trading Data
    console.log("📈 Seeding trading data...");
    const tradingTypes = ["up-down", "contract"];
    const tradingSymbols = markets.map((m) => m[0]);
    for (let i = 0; i < 40; i++) {
      const userId = userIds[Math.floor(Math.random() * userIds.length)];
      const symbol =
        tradingSymbols[Math.floor(Math.random() * tradingSymbols.length)];
      const tType =
        tradingTypes[Math.floor(Math.random() * tradingTypes.length)];
      const amount = (Math.random() * 500).toFixed(2);
      const status =
        Math.random() > 0.7 ? "pending" : Math.random() > 0.5 ? "won" : "lost";

      await db.query(
        "INSERT INTO trading_trades (user_id, symbol, trading_type, amount, currency, direction, leverage, entry_price, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW() - INTERVAL ? MINUTE)",
        [
          userId,
          symbol,
          tType,
          amount,
          "USDT",
          Math.random() > 0.5 ? "up" : "down",
          10,
          50000,
          status,
          Math.floor(Math.random() * 1000),
        ],
      );
    }

    // 7. Generate Lottery Data
    console.log("🎫 Seeding lottery bets...");
    const [lottoRows]: any = await db.query("SELECT id FROM lotteries");
    if (lottoRows.length > 0) {
      for (let i = 0; i < 50; i++) {
        const userId = userIds[Math.floor(Math.random() * userIds.length)];
        const lottoId =
          lottoRows[Math.floor(Math.random() * lottoRows.length)].id;

        try {
          await db.query(
            "INSERT INTO lottery_bets (user_id, lottery_id, balls, amount, status) VALUES (?, ?, ?, ?, ?)",
            [
              userId,
              lottoId,
              JSON.stringify([1, 2, 3, 4, 5]),
              5.0,
              Math.random() > 0.5 ? "pending" : "won",
            ],
          );
        } catch (e) {
          console.log(
            "Lottery bets table might not exist or schema differs, skipping...",
          );
        }
      }
    }

    // 8. Generate Admin Audit Logs
    console.log("📋 Seeding admin audit logs...");
    const [adminRows]: any = await db.query(
      "SELECT id FROM users WHERE role IN ('admin', 'super_admin')",
    );
    if (adminRows.length > 0) {
      const adminId = adminRows[0].id;
      const actions = [
        [
          "update_user",
          "user",
          "1",
          '{"reason": "Manual balance adjustment", "amount": 100}',
        ],
        ["ban_user", "user", "5", '{"reason": "Suspicious activity detected"}'],
        [
          "update_setting",
          "platform",
          "general",
          '{"maintenance_mode": false}',
        ],
        [
          "create_promotion",
          "promotion",
          "12",
          '{"name": "Weekend Bonus 200%"}',
        ],
        [
          "resolve_dispute",
          "support",
          "882",
          '{"outcome": "Refund processed"}',
        ],
        ["update_vip_config", "system", "vip", '{"min_wager_gold": 20000}'],
      ];

      for (const a of actions) {
        await db.query(
          "INSERT INTO admin_audit_logs (admin_id, action, target_type, target_id, details, ip_address) VALUES (?, ?, ?, ?, ?, ?)",
          [
            adminId,
            a[0],
            a[1],
            a[2],
            a[3],
            "192.168.1." + Math.floor(Math.random() * 255),
          ],
        );
      }
    }

    console.log("✅ Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

seed();
