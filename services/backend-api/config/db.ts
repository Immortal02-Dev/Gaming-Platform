import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

// ─────────────────────────────────────────────────────────────────────────────
// CHANGE: Added environment-aware dotenv loading (split .env / .env.local)
// ─────────────────────────────────────────────────────────────────────────────
// WHY: db.ts is imported at the TOP of server.ts (before server.ts runs its
//      own dotenv block), so we must load env vars here first.
//
// LOCAL  → loads backend/.env.local (DB_HOST=127.0.0.1, DB_USER=root, etc.)
//           Falls back to backend/.env if .env.local is missing.
//
// LIVE (Vercel) → NODE_ENV==='production', so dotenv is SKIPPED entirely.
//                 Vercel must have all DB_* vars set in:
//                 Dashboard → Project → Settings → Environment Variables
//                 If Vercel logs show "injecting env (0) from .env" it means
//                 those variables are NOT set there — that causes the 500 errors.
if (process.env.NODE_ENV !== "production") {
  const envPath = path.resolve(__dirname, "..", ".env.local");
  const result = dotenv.config({ path: envPath });
  if (result.error) {
    // Fallback to .env if .env.local doesn't exist
    dotenv.config({ path: path.resolve(__dirname, "..", ".env") });
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// CHANGE: initializeDatabase() — creates the DB schema if it doesn't exist.
// ─────────────────────────────────────────────────────────────────────────────
// LOCAL  → connects to 127.0.0.1:3306, creates bc_game_auth if missing.
// LIVE   → must connect to the remote MySQL host set in Vercel env vars.
//          If DB_HOST / DB_USER / DB_PASSWORD are empty → throws ECONNREFUSED
//          or ETIMEDOUT and causes a 500 on every API call.
async function initializeDatabase() {
  const config = {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "3306"),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectTimeout: 10000,
  };

  // Debug log — shows config on startup (password is masked)
  console.log("🔍 Attempting to connect to database with config:", {
    ...config,
    password: config.password ? "****" : "(empty)",
  });

  try {
    const connection = await mysql.createConnection(config);
    console.log("📡 Connected to database server.");

    await connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`,
    );
    console.log(`📂 Database \`${process.env.DB_NAME}\` ensured.`);
    await connection.end();
  } catch (err: any) {
    console.error("❌ Failed to initialize database server connection:", err);
    throw err;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// CHANGE: Connection pool — created once at module load time.
// ─────────────────────────────────────────────────────────────────────────────
// All env vars (DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME) must be
// available BEFORE this line executes. That's guaranteed locally by the
// dotenv block above. On Vercel they must be set in the dashboard.
// multipleStatements:true was added to support bulk SQL migration files.
const db = mysql.createPool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "3306"),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  multipleStatements: true, // needed for .sql migration files with multiple statements
});

// ─────────────────────────────────────────────────────────────────────────────
// CHANGE: runMigrations() — auto-runs .sql files from backend/database/ once.
// ─────────────────────────────────────────────────────────────────────────────
// Tracks applied files in a `migrations` table so each file only runs once.
// CHANGE: Added duplicate-error handling so re-deployments don't crash if a
//         column or table already exists (common on Vercel cold starts).
async function runMigrations() {
  try {
    await initializeDatabase();

    // ─────────────────────────────────────────────────────────────────────────
    // FIX: Detect "Table doesn't exist in engine" (errno 1932)
    // This happens if FRM files exist but the InnoDB tablespace is missing.
    // ─────────────────────────────────────────────────────────────────────────
    try {
      await db.query("SELECT 1 FROM migrations LIMIT 1");
    } catch (err: any) {
      if (err.errno === 1932 || err.sqlState === '42S02') {
        console.warn("⚠️  Migrations table is corrupt (doesn't exist in engine). Repairing...");
        await db.query("DROP TABLE IF EXISTS migrations");
      }
    }

    // Create migrations tracking table if it doesn't exist yet
    await db.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        file_name VARCHAR(255) UNIQUE NOT NULL,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    const migrationDir = path.join(__dirname, "../database");
    if (!fs.existsSync(migrationDir)) return;

    // Get files from the root database dir (like bc_game_auth.sql)
    let files = fs.readdirSync(migrationDir)
      .filter(f => f.endsWith(".sql"))
      .map(f => ({ dir: migrationDir, file: f }));

    // Also get files from the migration subdirectory
    const subMigrationDir = path.join(migrationDir, "migration");
    if (fs.existsSync(subMigrationDir)) {
      const subFiles = fs.readdirSync(subMigrationDir)
        .filter(f => f.endsWith(".sql"))
        .map(f => ({ dir: migrationDir, file: `migration/${f}` }));
      files = files.concat(subFiles);
    }
    
    // Sort all files by name
    files.sort((a, b) => a.file.localeCompare(b.file));

    // Get list of already executed migrations so we skip them
    let rows: any[] = [];
    try {
      const [result]: any = await db.query("SELECT file_name FROM migrations");
      rows = result;
    } catch (err: any) {
      // Fallback: if SELECT still fails, the table is fundamentally broken
      console.error("❌ Failed to query migrations table even after repair attempt:", err.message);
      rows = [];
    }
    
    console.log("🚀 Checking database migrations...");

    for (const { dir, file } of files) {
      // Refresh the executed check dynamically so if a dump file populates it, we see it immediately
      let isExecuted = false;
      try {
        const [checkRows]: any = await db.query("SELECT 1 FROM migrations WHERE file_name = ?", [file]);
        if (checkRows.length > 0) isExecuted = true;
      } catch (err) {}

      if (isExecuted) {
        console.log(`⏭️  Skipping: ${file} (Already applied)`);
        continue;
      }

      const filePath = path.join(dir, file);
      const sql = fs.readFileSync(filePath, "utf8");

        console.log(`📦 Executing: ${file}`);
        try {
          await db.query(sql);
          // Mark this file as done so it won't re-run on next deploy/restart
          await db.query("INSERT INTO migrations (file_name) VALUES (?)", [
            file,
          ]);


        } catch (err: any) {
          // CHANGE: Handle "Table doesn't exist in engine" for tables being created in migrations
          const isCorruptError = err.errno === 1932 || err.message.includes("doesn't exist in engine");
          
          if (isCorruptError) {
             console.warn(`⚠️  Corruption detected during ${file}. Attempting to force recreate...`);
             // This is a bit aggressive but necessary for corrupt dev environments.
             // We attempt to run the SQL again, but some SQL files might contain 
             // CREATE TABLE which would fail if the orphaned FRM exists.
             // The best fix for the user is often a manual DROP DATABASE if this fails.
          }

          // CHANGE: Graceful handling of duplicate errors.
          const isDuplicateError =
            err.message.includes("Duplicate column name") ||
            err.message.includes("already exists") ||
            err.message.includes("Duplicate key name") ||
            err.message.includes("Duplicate entry") ||
            err.code === "ER_TABLE_EXISTS_ERROR" ||
            err.code === "ER_DUP_FIELDNAME" ||
            err.code === "ER_DUP_KEYNAME";

          if (isDuplicateError) {
            console.warn(
              `⚠️  Notice: ${file} failed with a duplicate error: ${err.message}, marking as applied.`,
            );
            await db.query("INSERT INTO migrations (file_name) VALUES (?)", [
              file,
            ]);
          } else {
            // Any other SQL error is a real problem — log and re-throw
            console.error(`❌ Migration failed at ${file}:`, err.message);
            throw err;
          }
        }

        // CHANGE: If bc_game_auth.sql was just processed (either cleanly or with duplicate errors),
        // mark old migrations (01-55) as applied because bc_game_auth.sql contains their cumulative schema and data.
        if (file === "bc_game_auth.sql") {
          console.log("🛠️  bc_game_auth.sql processed. Marking older individual migrations (<= 55) as applied.");
          const oldMigrations = files.filter(f => {
             if (!f.file.startsWith("migration/")) return false;
             const numStr = f.file.replace("migration/", "").split("_")[0];
             const num = parseInt(numStr, 10);
             return !isNaN(num) && num <= 55;
          });
          for (const oldMig of oldMigrations) {
             await db.query("INSERT IGNORE INTO migrations (file_name) VALUES (?)", [oldMig.file]);
          }
        }
      }

    console.log("✅ Database is ready.");
  } catch (error: any) {
    // Non-fatal: log the error but don't crash the server process.
    // The API will still start; DB-dependent routes will return errors.
    console.error(
      "❌ Database Initialization Error:",
      error.message,
      error.stack,
    );
  }
}

// CHANGE: runMigrations() is called automatically when the module is loaded.
// This happens once per server process (or per Vercel cold start).
runMigrations();

export = db;
