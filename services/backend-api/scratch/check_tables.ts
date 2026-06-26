
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "../.env") });

async function check() {
  console.log("Connecting with:", {
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
  });
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    const checks = ['banners', 'swap_rates', 'currencies', 'platform_settings'];
    for (const table of checks) {
      console.log(`\n--- Checking ${table} ---`);
      try {
        const [status]: any = await connection.query(`SHOW TABLE STATUS LIKE '${table}'`);
        console.log("Status:", status[0] ? { Name: status[0].Name, Engine: status[0].Engine, Comment: status[0].Comment } : "Not found");
        if (status[0] && status[0].Engine) {
          const [desc] = await connection.query(`DESCRIBE ${table}`);
          console.log("Structure: OK");
        } else if (status[0]) {
           console.log("Structure: BROKEN");
        }
      } catch (e: any) {
        console.error(`Error with ${table}:`, e.message);
      }
    }

  } catch (error: any) {
    console.error("Check failed:", error.message);
  } finally {
    await connection.end();
  }
}

check();
