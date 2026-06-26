import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.join(__dirname, "../.env") });

async function runSQL() {
  const db = await mysql.createConnection({
    host: process.env.DB_HOST || "127.0.0.1",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "bc_game_auth",
    multipleStatements: true
  });

  const m53 = path.join(__dirname, "53_migration_payment_gateways.sql");

  console.log("Executing 53...");
  try {
    const sql53 = fs.readFileSync(m53, "utf8");
    await db.query(sql53);
    console.log("✅ 53 Success");
  } catch (err: any) {
    console.error("❌ 53 Failed:", err.message);
  }

  await db.end();
}

runSQL().catch(console.error);
