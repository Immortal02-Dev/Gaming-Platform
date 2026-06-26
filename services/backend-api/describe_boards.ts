import db from "./config/db";

async function describeBoards() {
    try {
        const [rows]: any = await db.query("DESCRIBE boards");
        console.log("Boards schema:", JSON.stringify(rows, null, 2));
        process.exit(0);
    } catch (err) {
        process.exit(1);
    }
}

describeBoards();
