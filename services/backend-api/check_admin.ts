import db from "./config/db";

async function checkAdmin() {
    try {
        const [rows]: any = await db.query("SELECT * FROM users WHERE role IN ('admin', 'super_admin')");
        console.log("Admins:", JSON.stringify(rows, null, 2));
        process.exit(0);
    } catch (err) {
        console.error("Error:", err);
        process.exit(1);
    }
}

checkAdmin();
