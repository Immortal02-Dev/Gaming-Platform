import mysql from "mysql2/promise";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "../.env") });

async function checkTables() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  const [rows]: any = await connection.query("SHOW TABLES");
  const tables = rows.map((r: any) => Object.values(r)[0]);
  console.log("--- TABLES ---");
  console.log(JSON.stringify(tables, null, 2));
  
  const [migrations]: any = await connection.query("SELECT * FROM migrations ORDER BY id DESC LIMIT 10");
  console.log("--- LATEST MIGRATIONS ---");
  console.table(migrations);

  await connection.end();
}

checkTables().catch(console.error);
