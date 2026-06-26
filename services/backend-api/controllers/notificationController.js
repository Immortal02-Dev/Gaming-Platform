const db = require("../config/db");

// ── Admin Notification Routes ──────────────────────────────────────────────

exports.getAllNotifications = async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM notifications ORDER BY created_at DESC");
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.createNotification = async (req, res) => {
  try {
    const { user_id, title, message, type, scheduled_for, send_email, send_push } = req.body;
    
    let status = 'sent';
    if (scheduled_for) {
      const scheduledDate = new Date(scheduled_for);
      if (scheduledDate > new Date()) {
        status = 'pending';
      }
    }

    await db.execute(
      `INSERT INTO notifications 
        (user_id, title, message, type, scheduled_for, status, send_email, send_push) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user_id || null, 
        title, 
        message, 
        type || 'info', 
        scheduled_for ? new Date(scheduled_for) : null,
        status,
        send_email ? 1 : 0,
        send_push ? 1 : 0
      ]
    );
    res.status(201).json({ success: true, message: "Notification created successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;
    await db.execute("DELETE FROM notifications WHERE id = ?", [id]);
    res.status(200).json({ success: true, message: "Notification deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ── User Notification Routes ───────────────────────────────────────────────

exports.getUserNotifications = async (req, res) => {
  try {
    const userId = req.user.id;
    // Get user-specific notifications and global notifications (where user_id is NULL)
    const [rows] = await db.execute(
      "SELECT * FROM notifications WHERE user_id = ? OR user_id IS NULL ORDER BY created_at DESC LIMIT 50",
      [userId]
    );
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    // In a real system, you might need a separate table to track read status 
    // for global notifications. For now, we'll assume it's simple.
    await db.execute("UPDATE notifications SET is_read = 1 WHERE id = ? AND user_id = ?", [id, userId]);
    res.status(200).json({ success: true, message: "Marked as read" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
