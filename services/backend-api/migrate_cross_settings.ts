import pool from './config/db';

async function migrate() {
  try {
    console.log("Altering sport_market_types table...");
    try {
      await pool.query(`
        ALTER TABLE sport_market_types
        ADD COLUMN typeCrossSpecial INT DEFAULT 1,
        ADD COLUMN useSingle TINYINT DEFAULT 0,
        ADD COLUMN typeFlag INT DEFAULT 1;
      `);
      console.log("Added columns to sport_market_types.");
    } catch (e: any) {
      if (e.code === 'ER_DUP_FIELDNAME') {
        console.log("Columns already exist in sport_market_types, skipping.");
      } else {
        throw e;
      }
    }

    console.log("Creating sport_cross_settings table...");
    await pool.query(`
      CREATE TABLE IF NOT EXISTS sport_cross_settings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        typeFlag VARCHAR(10) NOT NULL,
        typeSameMatch VARCHAR(10) NOT NULL,
        crossSetting TEXT NOT NULL,
        updateDate DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);

    console.log("Done.");
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
}

migrate();
