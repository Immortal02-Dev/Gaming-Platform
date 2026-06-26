import db from "./config/db";

async function showTables() {
    try {
        const [rows]: any = await db.query("SHOW TABLES LIKE '%answer%'");
        console.log("Tables:", JSON.stringify(rows, null, 2));
        process.exit(0);
    } catch (err) {
        process.exit(1);
    }
}

showTables();
