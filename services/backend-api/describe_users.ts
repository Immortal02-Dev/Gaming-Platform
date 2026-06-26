import db from "./config/db";

async function describeUsers() {
    try {
        const [rows]: any = await db.query("DESCRIBE users");
        console.log("Users schema:", JSON.stringify(rows, null, 2));
        process.exit(0);
    } catch (err) {
        console.error("Error:", err);
        process.exit(1);
    }
}

describeUsers();
