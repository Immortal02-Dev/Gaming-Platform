import db from "../config/db";

async function verify() {
  const tables = [
    "users",
    "user_balances",
    "wallet_transactions",
    "bets",
    "trading_trades",
    "lottery_bets",
    "admin_audit_logs",
    "sports",
    "leagues",
    "teams",
    "match_events",
    "match_odds"
  ];

  console.log("📊 Database Verification Results:");
  for (const table of tables) {
    try {
      const [rows]: any = await db.query(
        `SELECT COUNT(*) as count FROM ${table}`,
      );
      const count = rows[0].count;
      console.log(`- ${table}: ${count} records`);
    } catch (e: any) {
      console.log(`- ${table}: Error (${e.message})`);
    }
  }

  // Check specific sports data
  try {
    const [matches]: any = await db.query(`
      SELECT m.id, s.name as sport, l.name as league, m.home_score, m.away_score, m.status
      FROM match_events m
      JOIN leagues l ON m.league_id = l.id
      JOIN sports s ON l.sport_id = s.id
      LIMIT 5
    `);
    if (matches.length > 0) {
      console.log("\n🏀 Sample Sports Matches:");
      console.table(matches);
    } else {
      console.log("\n❌ No sports matches found in match_events table.");
    }
  } catch (e: any) {
    console.log(`\n❌ Error checking matches: ${e.message}`);
  }

  process.exit(0);
}

verify();
