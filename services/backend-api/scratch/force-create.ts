import mysql from "mysql2/promise";

async function forceCreate() {
  const db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bc_game_auth'
  });

  console.log("Creating banners...");
  await db.query(`
    CREATE TABLE IF NOT EXISTS banners (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255),
        description TEXT,
        image TEXT NOT NULL,
        href VARCHAR(255) DEFAULT '/',
        gradient_color VARCHAR(100),
        sort_order INT DEFAULT 0,
        is_active TINYINT(1) DEFAULT 1,
        is_promo TINYINT(1) DEFAULT 0,
        badge_image TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  console.log("Creating currencies...");
  await db.query(`
    CREATE TABLE IF NOT EXISTS currencies (
        id INT AUTO_INCREMENT PRIMARY KEY,
        symbol VARCHAR(20) UNIQUE NOT NULL,
        name VARCHAR(100) NOT NULL,
        type ENUM('crypto', 'fiat') DEFAULT 'crypto',
        icon_url TEXT,
        network VARCHAR(100),
        is_enabled TINYINT(1) DEFAULT 1,
        sort_order INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);

  console.log("✅ Tables created (one by one)");
  
  const [tables]: any = await db.query("SHOW TABLES");
  console.log("Tables now:", tables.map((r: any) => Object.values(r)[0]));

  await db.end();
}

forceCreate().catch(console.error);
