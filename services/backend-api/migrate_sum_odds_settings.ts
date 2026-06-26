import pool from './config/db';

async function migrate() {
  try {
    console.log("Creating sport_sum_odds_settings table...");
    await pool.query(`
      CREATE TABLE IF NOT EXISTS sport_sum_odds_settings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        sportIdx INT NOT NULL,
        typeFlagIdx INT NOT NULL,
        groupIdx INT NOT NULL,
        category INT NOT NULL,
        sumOdds DECIMAL(10, 2) DEFAULT NULL,
        defaultOdds DECIMAL(10, 2) DEFAULT NULL,
        updateDate DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        UNIQUE KEY idx_unique_sum_odds (sportIdx, typeFlagIdx, groupIdx, category)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    console.log("Checking if seeding is required...");
    const [rows]: any = await pool.query("SELECT COUNT(*) as cnt FROM sport_sum_odds_settings");
    if (rows[0].cnt === 0) {
      console.log("Seeding initial data...");

      const seedData = [];
      const sports = [1, 2, 3, 5, 6, 11, 58]; // Soccer, Hockey, Basketball, Volleyball, Football, Baseball, LoL
      const types = [1, 2]; // 1: Prematch, 2: Live
      const groups = [1, 2]; // 1: Standard, 2: Special
      const categories = [2, 3, 4, 5]; // 승패, 핸디캡, 오버언더, 기타
      
      for (const sport of sports) {
        for (const type of types) {
          for (const group of groups) {
            for (const cat of categories) {
              seedData.push([sport, type, group, cat, null, null]);
            }
          }
        }
      }

      const query = `
        INSERT INTO sport_sum_odds_settings (
          sportIdx, typeFlagIdx, groupIdx, category, sumOdds, defaultOdds
        ) VALUES ?
      `;
      
      await pool.query(query, [seedData]);
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
