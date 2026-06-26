import pool from './config/db';

async function migrate() {
  try {
    console.log("Creating sport_market_types table...");
    await pool.query(`
      CREATE TABLE IF NOT EXISTS sport_market_types (
        marketTypeIdx INT AUTO_INCREMENT PRIMARY KEY,
        sportIdx INT NOT NULL,
        sportName VARCHAR(100) NOT NULL,
        marketTypeName VARCHAR(255) NOT NULL,
        displayName VARCHAR(255),
        sort INT DEFAULT 0,
        specialType VARCHAR(100),
        division VARCHAR(100),
        prematchUseYN TINYINT DEFAULT 0,
        liveUseYN TINYINT DEFAULT 0,
        prematchUsePoint TEXT,
        liveUsePoint TEXT,
        prematchMinPrice DECIMAL(10, 2),
        prematchMaxPrice DECIMAL(10, 2),
        liveMinPrice DECIMAL(10, 2),
        liveMaxPrice DECIMAL(10, 2),
        updateUserName VARCHAR(100),
        updateDate DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        isHandicap TINYINT DEFAULT 0,
        isOverUnder TINYINT DEFAULT 0,
        INDEX idx_sport (sportIdx)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
    
    console.log("Checking if seeding is required...");
    const [rows]: any = await pool.query("SELECT COUNT(*) as cnt FROM sport_market_types");
    if (rows[0].cnt === 0) {
      console.log("Seeding initial data...");
      
      const seedData = [
        [1, '축구', '1X2', '승무패', 1, 1, 1, '1,1.5', '1,1.5', 1.01, 100, 1.01, 100, 'System', 0, 0],
        [1, '축구', 'Handicap', '핸디캡', 2, 1, 1, '0.5,1,1.5', '0.5,1,1.5', 1.01, 100, 1.01, 100, 'System', 1, 0],
        [1, '축구', 'Over/Under', '언더오버', 3, 1, 1, '0.5,1,1.5,2.5', '0.5,1,1.5,2.5', 1.01, 100, 1.01, 100, 'System', 0, 1],
        [3, '농구', 'Moneyline', '승패', 1, 1, 1, '', '', 1.01, 100, 1.01, 100, 'System', 0, 0],
        [3, '농구', 'Handicap', '핸디캡', 2, 1, 1, '-5.5,5.5', '-5.5,5.5', 1.01, 100, 1.01, 100, 'System', 1, 0],
        [3, '농구', 'Over/Under', '언더오버', 3, 1, 1, '200.5,210.5', '200.5,210.5', 1.01, 100, 1.01, 100, 'System', 0, 1],
        [11, '야구', 'Moneyline', '승패', 1, 1, 1, '', '', 1.01, 100, 1.01, 100, 'System', 0, 0],
        [11, '야구', 'Run Line', '핸디캡', 2, 1, 1, '-1.5,1.5', '-1.5,1.5', 1.01, 100, 1.01, 100, 'System', 1, 0],
        [11, '야구', 'Over/Under', '언더오버', 3, 1, 1, '7.5,8.5,9.5', '7.5,8.5,9.5', 1.01, 100, 1.01, 100, 'System', 0, 1],
        [58, '리그오브레전드', 'Match Winner', '승패', 1, 1, 1, '', '', 1.01, 100, 1.01, 100, 'System', 0, 0]
      ];
      
      const query = `
        INSERT INTO sport_market_types (
          sportIdx, sportName, marketTypeName, displayName, sort, 
          prematchUseYN, liveUseYN, prematchUsePoint, liveUsePoint, 
          prematchMinPrice, prematchMaxPrice, liveMinPrice, liveMaxPrice, 
          updateUserName, isHandicap, isOverUnder
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
