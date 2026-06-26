import db from "./config/db";

async function checkTable() {
    try {
        const [rows]: any = await db.query("SHOW TABLES LIKE 'messages'");
        console.log("Table 'messages' exists:", rows.length > 0);
        if (rows.length > 0) {
            const [data]: any = await db.query("SELECT COUNT(*) as count FROM messages");
            console.log("Message count:", data[0].count);
            
            const [columns]: any = await db.query("DESCRIBE messages");
            console.log("Columns:", JSON.stringify(columns, null, 2));
        } else {
            console.log("Table 'messages' does NOT exist.");
            const [migrations]: any = await db.query("SELECT * FROM migrations WHERE file_name LIKE '%messages%'");
            console.log("Migrations status:", JSON.stringify(migrations, null, 2));
        }
        process.exit(0);
    } catch (err) {
        console.error("Error:", err);
        process.exit(1);
    }
}

checkTable();
