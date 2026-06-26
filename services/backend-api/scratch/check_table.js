const db = require("../config/db");

async function check() {
  try {
    const [rows] = await db.execute("SHOW TABLES LIKE 'currencies'");
    if (rows.length > 0) {
      console.log("TABLE_EXISTS");
      const [columns] = await db.execute("DESCRIBE currencies");
      console.log("COLUMNS:", JSON.stringify(columns));
    } else {
      console.log("TABLE_MISSING");
    }
  } catch (error) {
    console.error("ERROR:", error.message);
  } finally {
    process.exit();
  }
}

check();
