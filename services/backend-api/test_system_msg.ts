import db from "./config/db";

async function testSystemMessage() {
    try {
        console.log("Inserting system message...");
        const senderId = null; 
        const receiverId = 4; 
        const subject = "System Alert";
        const content = "This is a system message.";
        
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

testSystemMessage();
