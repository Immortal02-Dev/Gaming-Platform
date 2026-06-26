const db = require("../../config/db");

// ── Admin Chat Management ───────────────────────────────────

exports.getAllMessages = async (req, res) => {
  try {
    const { limit = 50, offset = 0 } = req.query;
    const [rows] = await db.execute(
      `SELECT * FROM chat_messages ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      [String(limit), String(offset)]
    );
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    await db.execute("DELETE FROM chat_messages WHERE id = ?", [id]);
    res.status(200).json({ success: true, message: "Message deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.clearChat = async (req, res) => {
  try {
    await db.execute("DELETE FROM chat_messages");
    res.status(200).json({ success: true, message: "Chat history cleared" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── Public Chat Logic (For Frontend) ─────────────────────────

exports.getPublicMessages = async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM chat_messages WHERE type = 'public' ORDER BY created_at DESC LIMIT 50"
    );
    res.status(200).json({ success: true, data: rows.reverse() });
  } catch (error) {
    // Table may not exist yet — return empty array gracefully
    if (error.code === 'ER_NO_SUCH_TABLE') {
      return res.status(200).json({ success: true, data: [] });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.sendPublicMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    if (!message || message.trim().length === 0) {
      return res.status(400).json({ success: false, message: "Message cannot be empty" });
    }

    // Fetch user details from DB (JWT only contains id/username/role)
    const [[user]] = await db.execute(
      "SELECT username, nickname FROM users WHERE id = ?",
      [userId]
    );

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Use nickname as display name if available, else username
    const displayName = user.nickname || user.username;

    await db.execute(
      "INSERT INTO chat_messages (user_id, username, avatar_url, message) VALUES (?, ?, ?, ?)",
      [userId, displayName, null, message]
    );

    res.status(201).json({ success: true, message: "Message sent" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
