import db from "../config/db";
import fs from "fs";
import path from "path";

async function runMigration() {
  try {
    const migrationPath = path.join(__dirname, "../database/51_migration_security_risk_management.sql");
    const sql = fs.readFileSync(migrationPath, "utf8");
    
    // Split by semicolon, but handle cases where semicolon might be inside quotes
    // For simplicity, we split and filter out empty ones
    const statements = sql
      .split(";")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    console.log(`Executing ${statements.length} statements...`);

    for (const statement of statements) {
      await db.execute(statement);
      console.log("Executed successfully.");
    }

    console.log("Migration 51 completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

runMigration();
