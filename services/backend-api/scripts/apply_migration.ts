import db from "../config/db";

import fs from "fs";
import path from "path";

async function runMigration() {
  const migrationPath = path.join(
    __dirname,
    "database",
    "45_migration_vip_system_update.sql",
  );
  const sql = fs.readFileSync(migrationPath, "utf8");

  // Split by semicolon and run each statement
  const statements = sql
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  console.log(`Running ${statements.length} migration statements...`);

  for (const statement of statements) {
    try {
      await db.execute(statement);
      console.log("✓ SUCCESS:", statement.substring(0, 50) + "...");
    } catch (error: any) {
      console.error("✗ ERROR:", error.message);
      console.error("Statement:", statement);
      // Don't exit on error if it's "Duplicate column" etc.
      if (
        !error.message.includes("Duplicate column") &&
        !error.message.includes("already exists")
      ) {
        process.exit(1);
      }
    }
  }

  console.log("Migration completed successfully.");
  process.exit(0);
}

runMigration();
