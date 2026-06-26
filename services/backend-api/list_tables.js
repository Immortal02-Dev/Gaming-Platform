const db = require("./config/db");

async function listTables() {
  try {
    const [rows] = await db.query("SHOW TABLES");
    console.log("Database Tables:");
    console.table(rows);
    process.exit();
  } catch (err) {
    console.error("Failed to list tables:", err);
    process.exit(1);
  }
}

listTables();
