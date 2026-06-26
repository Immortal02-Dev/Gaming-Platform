const db = require("../../config/db");

// GET /api/admin/messages
exports.getAllMessages = async (req, res) => {
  const { page = 1, pageSize = 50, searchType, searchText } = req.query;
  const limit = parseInt(pageSize);
  const offset = (parseInt(page) - 1) * limit;

  try {
    let whereClause = "WHERE 1=1";
    const params = [];

    if (searchText && searchText.trim() !== "" && searchType) {
      if (searchType === "subject") {
        whereClause += " AND m.subject LIKE ?";
        params.push(`%${searchText}%`);
      } else if (searchType === "id") {
        whereClause += " AND u_recv.username LIKE ?";
        params.push(`%${searchText}%`);
      } else if (searchType === "nick") {
        whereClause += " AND u_recv.nickname LIKE ?";
        params.push(`%${searchText}%`);
      }
      // "parent" search would require more joins if needed
    }

    // Get total count
    const [countResult] = await db.query(
      `SELECT COUNT(*) as total FROM messages m 
       JOIN users u_recv ON m.receiver_id = u_recv.id
       ${whereClause}`,
      params
    );
    const total = countResult[0].total;

    // Get messages
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
      ${whereClause}
      ORDER BY m.created_at DESC
      LIMIT ? OFFSET ?
    `;

    const [rows] = await db.query(query, [...params, limit, offset]);

    // Map to match frontend expectations
    const mappedRows = rows.map((r) => ({
      ...r,
      sender: {
        username: r.sender_username || "System",
        nickname: r.sender_nickname || "System",
        display: r.sender_username ? `${r.sender_username} (${r.sender_nickname})` : "System",
      },
      receiver: {
        username: r.receiver_username,
        nickname: r.receiver_nickname,
        display: `${r.receiver_username} (${r.receiver_nickname})`,
      },
      parent: null, // Placeholder for now
      isRead: !!r.isRead,
    }));

    res.json({
      success: true,
      data: mappedRows,
      pagination: {
        total,
        page: parseInt(page),
        pageSize: limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Fetch messages error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/admin/messages
exports.sendMessage = async (req, res) => {
  const { receiverId, messageTitle, messageContent } = req.body;
  const senderId = req.user?.id || null; // Using user id from auth session

  try {
    await db.execute(
      "INSERT INTO messages (sender_id, receiver_id, subject, content) VALUES (?, ?, ?, ?)",
      [senderId, receiverId, messageTitle, messageContent]
    );
    res.json({ success: true, message: "쪽지가 성공적으로 발송되었습니다." });
  } catch (error) {
    console.error("Send message error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/admin/messages/:id
exports.getMessageDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query(
      `SELECT m.*, u_recv.username as receiver_username, u_recv.nickname as receiver_nickname
       FROM messages m
       JOIN users u_recv ON m.receiver_id = u_recv.id
       WHERE m.id = ?`,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ success: false, message: "Message not found" });
    }

    const message = rows[0];
    res.json({
      success: true,
      data: {
        ...message,
        receiver: {
          username: message.receiver_username,
          nickname: message.receiver_nickname,
          display: `${message.receiver_username} (${message.receiver_nickname})`,
        }
      }
    });
  } catch (error) {
    console.error("Get message detail error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// DELETE /api/admin/messages/:id
exports.deleteMessage = async (req, res) => {
  const { id } = req.params;
  try {
    await db.execute("DELETE FROM messages WHERE id = ?", [id]);
    res.json({ success: true, message: "쪽지가 삭제되었습니다." });
  } catch (error) {
    console.error("Delete message error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/admin/messages/delete-selected
exports.deleteSelectedMessages = async (req, res) => {
  const { messageIds } = req.body;
  if (!Array.isArray(messageIds) || messageIds.length === 0) {
    return res.status(400).json({ success: false, message: "No messages selected" });
  }

  try {
    const placeholders = messageIds.map(() => "?").join(",");
    await db.execute(`DELETE FROM messages WHERE id IN (${placeholders})`, messageIds);
    res.json({ success: true, message: "선택한 쪽지가 삭제되었습니다." });
  } catch (error) {
    console.error("Delete selected messages error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/admin/messages/delete-all
exports.deleteAllMessages = async (req, res) => {
  try {
    await db.execute("DELETE FROM messages");
    res.json({ success: true, message: "전체 쪽지가 삭제되었습니다." });
  } catch (error) {
    console.error("Delete all messages error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
