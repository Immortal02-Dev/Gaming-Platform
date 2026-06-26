import mysql from "mysql2/promise";

async function verify() {
  const db = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bc_game_auth',
    multipleStatements: true
  });

  const [tables]: any = await db.query("SHOW TABLES");
  const tableNames = tables.map((r: any) => Object.values(r)[0]);
  console.log("Tables:", JSON.stringify(tableNames, null, 2));

  if (tableNames.includes('banners')) {
    const [rows]: any = await db.query("SELECT * FROM banners");
    console.log("Banners Count:", rows.length);
  } else {
    console.error("❌ Banners table still missing!");
  }

  if (tableNames.includes('currencies')) {
    const [rows]: any = await db.query("SELECT * FROM currencies");
    console.log("Currencies Count:", rows.length);
  } else {
    console.error("❌ Currencies table still missing!");
  }

  await db.end();
}

verify().catch(console.error);
