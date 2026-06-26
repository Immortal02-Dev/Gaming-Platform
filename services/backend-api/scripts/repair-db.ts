import mysql from "mysql2/promise";
import path from "path";
import dotenv from "dotenv";

// Load environment variables
const envPath = path.resolve(__dirname, "../.env.local");
const result = dotenv.config({ path: envPath });
if (result.error) {
  dotenv.config({ path: path.resolve(__dirname, "../.env") });
}

async function repairDatabase() {
  const config = {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "3306"),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  };

  const dbName = process.env.DB_NAME || "bc_game_auth";

  console.log(`[Repair] Connecting to MySQL server at ${config.host}:${config.port}...`);
  try {
    const connection = await mysql.createConnection(config);
    
    console.log(`[Repair] Dropping database \`${dbName}\` to clear corrupted tables...`);
    try {
      await connection.query(`DROP DATABASE IF EXISTS \`${dbName}\`;`);
    } catch (dropErr: any) {
      if (dropErr.errno === 1010) {
        console.log(`[Repair] MySQL could not remove the directory due to orphaned files. Attempting forceful deletion...`);
        const fs = require('fs');
        const [rows]: any = await connection.query("SHOW VARIABLES LIKE 'datadir'");
        const datadir = rows[0].Value;
        const dbPath = path.join(datadir, dbName);
        console.log(`[Repair] Deleting directory: ${dbPath}`);
        fs.rmSync(dbPath, { recursive: true, force: true });
        // After physical deletion, tell MySQL to drop the DB again to clear its internal dictionary cache
        try {
          await connection.query(`DROP DATABASE IF EXISTS \`${dbName}\`;`);
        } catch (e) {
          // Ignore if it fails now
        }
      } else {
        throw dropErr;
      }
    }
    
    console.log(`[Repair] Recreating database \`${dbName}\`...`);
    await connection.query(`CREATE DATABASE \`${dbName}\`;`);
    
    await connection.end();
    
    console.log(`✅ Database \`${dbName}\` has been reset successfully.`);
    console.log(`The server will automatically run migrations and seed data on its next startup.`);
  } catch (err: any) {
    console.error("❌ Failed to repair database:", err);
  }
}

repairDatabase();
