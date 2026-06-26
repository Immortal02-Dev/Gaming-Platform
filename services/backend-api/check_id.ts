import db from "./config/db";

async function checkId() {
    try {
        const [rows]: any = await db.query("DESCRIBE users");
        console.log("ID column:", rows[0]);
        process.exit(0);
    } catch (err) {
        process.exit(1);
    }
}

checkId();
