
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

dotenv.config({ path: path.join(__dirname, "../.env") });

async function run() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true
  });

  try {
    const file48 = path.join(__dirname, "../database/48_migration_platform_admin_features.sql");
    const sql = fs.readFileSync(file48, "utf8");
    console.log("🚀 Running migration 48 manually...");
    await connection.query(sql);
    console.log("✅ Migration 48 complete.");

    const file49 = path.join(__dirname, "../database/49_seed_platform_admin_data.sql");
    const sql2 = fs.readFileSync(file49, "utf8");
    console.log("🚀 Running migration 49 manually...");
    await connection.query(sql2);
    console.log("✅ Migration 49 complete.");

    // Record them as applied
    await connection.query("INSERT INTO migrations (file_name) VALUES ('48_migration_platform_admin_features.sql') ON DUPLICATE KEY UPDATE executed_at=CURRENT_TIMESTAMP");
    await connection.query("INSERT INTO migrations (file_name) VALUES ('49_seed_platform_admin_data.sql') ON DUPLICATE KEY UPDATE executed_at=CURRENT_TIMESTAMP");
    console.log("✅ Migration records updated.");

  } catch (error: any) {
    console.error("❌ Migration failed:", error.message);
  } finally {
    await connection.end();
  }
}

run();
