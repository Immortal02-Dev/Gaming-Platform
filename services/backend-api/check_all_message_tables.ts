import db from "./config/db";

async function checkTables() {
    try {
        const [rows]: any = await db.query("SHOW TABLES LIKE '%message%'");
        console.log("Tables:", JSON.stringify(rows, null, 2));
        process.exit(0);
    } catch (err) {
        console.error("Error:", err);
        process.exit(1);
    }
}

checkTables();
