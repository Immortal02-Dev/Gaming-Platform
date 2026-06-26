
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "../.env") });

async function check() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    const [rows]: any = await connection.query("SELECT * FROM migrations ORDER BY id DESC LIMIT 10");
    console.log("Last migrations applied:");
    console.table(rows);
  } catch (error: any) {
    console.error("Check failed:", error.message);
  } finally {
    await connection.end();
  }
}

check();
