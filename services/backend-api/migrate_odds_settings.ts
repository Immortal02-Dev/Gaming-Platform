import pool from './config/db';

async function migrate() {
  try {
    console.log("Creating sport_odds_settings table...");
    await pool.query(`
      CREATE TABLE IF NOT EXISTS sport_odds_settings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        sportIdx INT NOT NULL,
        typeFlagIdx INT NOT NULL,
        levelIdx INT NOT NULL,
        groupIdx INT NOT NULL,
        marketIdx INT NOT NULL,
        fromOdds DECIMAL(10, 2) DEFAULT NULL,
        toOdds DECIMAL(10, 2) DEFAULT NULL,
        returnRate DECIMAL(10, 2) DEFAULT NULL,
        updateDate DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY idx_unique_odds_setting (sportIdx, typeFlagIdx, levelIdx, groupIdx, marketIdx)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    console.log("Checking if seeding is required...");
    const [rows]: any = await pool.query("SELECT COUNT(*) as cnt FROM sport_odds_settings");
    if (rows[0].cnt === 0) {
      console.log("Seeding initial data...");

      const seedData = [];
      const sports = [1]; // Soccer initially
      const types = [1, 2]; // 1: Prematch, 2: Live
      
      for (const sport of sports) {
        for (const type of types) {
          for (let level = 1; level <= 10; level++) {
            for (let group = 1; group <= 2; group++) {
              for (let market = 1; market <= 5; market++) {
                seedData.push([sport, type, level, group, market, null, null, null]);
              }
            }
          }
        }
      }

      // Batch insert in chunks of 100 to avoid query size limits just in case
      const chunkSize = 100;
      for (let i = 0; i < seedData.length; i += chunkSize) {
        const chunk = seedData.slice(i, i + chunkSize);
        const query = `
          INSERT INTO sport_odds_settings (
            sportIdx, typeFlagIdx, levelIdx, groupIdx, marketIdx, fromOdds, toOdds, returnRate
          ) VALUES ?
        `;
        await pool.query(query, [chunk]);
      }
      console.log("Seeding complete.");
    } else {
      console.log("Table already contains data, skipping seed.");
    }

    console.log("Done.");
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
}

migrate();
