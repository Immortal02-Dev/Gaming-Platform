import db from "./config/db";

async function listTables() {
  try {
    const [rows]: any = await db.query("SHOW TABLES");
    console.log("Database Tables:");
    rows.forEach((row: any) => {
      console.log(Object.values(row)[0]);
    });
    process.exit();
  } catch (err) {
    console.error("Failed to list tables:", err);
    process.exit(1);
  }
}

listTables();
