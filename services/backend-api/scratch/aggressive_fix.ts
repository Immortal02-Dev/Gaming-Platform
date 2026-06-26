
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "../.env") });

async function fix() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  try {
    console.log("🚀 Starting aggressive cleanup for 'currencies' table...");

    // Try to drop it first
    try {
      await connection.query("DROP TABLE IF EXISTS currencies");
      console.log("✅ Dropped currencies (if existed)");
    } catch (e: any) {
      console.log("⚠️ Drop failed (expected if dictionary is out of sync):", e.message);
    }

    // Aggressive fix for "Tablespace exists"
    try {
      console.log("🛠️ Attempting to sync tablespace by creating dummy table...");
      await connection.query("CREATE TABLE currencies (id INT)");
      await connection.query("ALTER TABLE currencies DISCARD TABLESPACE");
      await connection.query("DROP TABLE currencies");
      console.log("✅ Aggressive cleanup for 'currencies' successful.");
    } catch (e: any) {
      console.log("⚠️ Aggressive cleanup failed (might already be fixed):", e.message);
    }

    // Do the same for 'banners' just in case, although it seemed OK
    try {
      await connection.query("DROP TABLE IF EXISTS banners");
      await connection.query("CREATE TABLE banners (id INT)");
      await connection.query("ALTER TABLE banners DISCARD TABLESPACE");
      await connection.query("DROP TABLE banners");
      console.log("✅ Aggressive cleanup for 'banners' successful.");
    } catch (e: any) {
      console.log("⚠️ Aggressive cleanup for 'banners' skipped/failed:", e.message);
    }

    // And swap_rates
    try {
      await connection.query("DROP TABLE IF EXISTS swap_rates");
    } catch (e) {}

    // Reset migration records
    await connection.query("DELETE FROM migrations WHERE file_name IN ('48_migration_platform_admin_features.sql', '49_seed_platform_admin_data.sql')");
    console.log("✅ Migration records reset.");

    console.log("🎉 Cleanup complete. Please restart the backend or run manual_migrate.ts");

  } catch (error: any) {
    console.error("❌ Fix failed:", error.message);
  } finally {
    await connection.end();
  }
}

fix();
