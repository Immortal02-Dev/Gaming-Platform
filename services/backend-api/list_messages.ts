import db from "./config/db";

async function listMessages() {
    try {
        const [rows]: any = await db.query("SELECT * FROM messages");
        console.log("All messages in table:", JSON.stringify(rows, null, 2));
        process.exit(0);
    } catch (err) {
        console.error("Error:", err);
        process.exit(1);
    }
}

listMessages();
