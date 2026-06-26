import db from "./config/db";

async function checkUsers() {
    try {
        const [rows]: any = await db.query("SELECT id, username, email_or_phone FROM users LIMIT 5");
        console.log("Users in database:", JSON.stringify(rows, null, 2));
        process.exit(0);
    } catch (err) {
        console.error("Error:", err);
        process.exit(1);
    }
}

checkUsers();
