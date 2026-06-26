import db from "./config/db";

async function testFetch() {
    try {
        const query = `
          SELECT 
            m.id,
            m.sender_id as senderId,
            m.sender_type as senderType,
            m.receiver_id as receiverId,
            m.subject,
            m.content,
            m.is_read as isRead,
            m.read_at as readAt,
            m.created_at as createdAt,
            u_send.username as sender_username,
            u_send.nickname as sender_nickname,
            u_recv.username as receiver_username,
            u_recv.nickname as receiver_nickname
          FROM messages m
          LEFT JOIN users u_send ON m.sender_id = u_send.id
          JOIN users u_recv ON m.receiver_id = u_recv.id
          WHERE 1=1
          ORDER BY m.created_at DESC
        `;

        const [rows]: any = await db.query(query);
        console.log("Fetched rows:", JSON.stringify(rows, null, 2));
        process.exit(0);
    } catch (err) {
        console.error("Error:", err);
        process.exit(1);
    }
}

testFetch();
