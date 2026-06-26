import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

// Load .env.local first, then fallback to .env
const envLocalPath = path.join(__dirname, "../.env.local");
const envPath = path.join(__dirname, "../.env");

if (fs.existsSync(envLocalPath)) {
  dotenv.config({ path: envLocalPath });
} else {
  dotenv.config({ path: envPath });
}

async function runMigration() {
  const db = await mysql.createConnection({
    host: process.env.DB_HOST || "127.0.0.1",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "bc_game_auth",
    multipleStatements: true
  });

  const migrationPath = path.join(__dirname, "../database/migration/69_migration_boards.sql");

  console.log("Executing migration 69...");
  try {
    const sql = fs.readFileSync(migrationPath, "utf8");
    await db.query(sql);
    console.log("✅ Migration 69 Success");
  } catch (err: any) {
    console.error("❌ Migration 69 Failed:", err.message);
  }

  await db.end();
  process.exit();
}

runMigration().catch(console.error);
