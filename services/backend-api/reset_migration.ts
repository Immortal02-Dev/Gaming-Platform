import db from "./config/db";

async function reset() {
    try {
        await db.query("DROP TABLE IF EXISTS messages");
        await db.query("DELETE FROM migrations WHERE file_name LIKE '%messages_table%'");
        console.log("Reset successful.");
        process.exit(0);
    } catch (err) {
        console.error("Reset failed:", err);
        process.exit(1);
    }
}

reset();
