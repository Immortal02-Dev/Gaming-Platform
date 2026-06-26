const db = require("./config/db");

async function checkMatches() {
  try {
    const [rows] = await db.query(`
            SELECT m.id, s.slug as sport, l.name as league, m.home_score, m.away_score, m.status, m.slug as match_slug
            FROM match_events m
            JOIN leagues l ON m.league_id = l.id
            JOIN sports s ON l.sport_id = s.id
            WHERE s.slug = 'basketball'
            ORDER BY m.id DESC
            LIMIT 10
        `);
    console.log("🏀 Current Basketball Matches in DB:");
    console.table(rows);
    process.exit();
  } catch (err) {
    console.error("❌ Link check failed:", err);
    process.exit(1);
  }
}

checkMatches();
