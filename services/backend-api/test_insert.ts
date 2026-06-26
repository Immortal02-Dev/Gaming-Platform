import db from "./config/db";

async function testInsert() {
    try {
        console.log("Testing insert...");
        const senderId = 1; // Assuming admin with ID 1 exists
        const receiverId = 4; // Assuming another user exists
        const subject = "Test Subject";
        const content = "Test Content";
        
        const [result]: any = await db.execute(
            "INSERT INTO messages (sender_id, receiver_id, subject, content) VALUES (?, ?, ?, ?)",
            [senderId, receiverId, subject, content]
        );
        console.log("Insert success, result:", result);
        process.exit(0);
    } catch (err) {
        console.error("Insert failed with error:", err);
        process.exit(1);
    }
}

testInsert();
