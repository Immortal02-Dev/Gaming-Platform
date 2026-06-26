
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "../.env") });

async function cleanup() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    console.log("🚀 Starting database cleanup...");

    // 1. Drop corrupted/related tables
    const tablesToDrop = ['banners', 'currencies', 'swap_rates'];
    for (const table of tablesToDrop) {
      console.log(`🗑️ Dropping table: ${table}`);
      await connection.query(`DROP TABLE IF EXISTS ${table}`);
    }

    // 2. Clear migration records
    const migrationsToReset = [
      '48_migration_platform_admin_features.sql',
      '49_seed_platform_admin_data.sql'
    ];
    console.log("🧹 Resetting migration records...");
    await connection.query(
      "DELETE FROM migrations WHERE file_name IN (?)",
      [migrationsToReset]
    );

    console.log("✅ Cleanup complete. The server should re-run migrations on next restart.");

  } catch (error: any) {
    console.error("❌ Cleanup failed:", error.message);
  } finally {
    await connection.end();
  }
}

cleanup();
