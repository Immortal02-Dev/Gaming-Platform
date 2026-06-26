const db = require('../config/db');

class NotificationScheduler {
  constructor() {
    this.intervalId = null;
    this.pollIntervalMs = 60000; // Run every minute
  }

  start() {
    console.log('[Notification Scheduler] Starting background worker...');
    // Run immediately on start
    this.processPendingNotifications();
    
    // Then run on interval
    this.intervalId = setInterval(() => {
      this.processPendingNotifications();
    }, this.pollIntervalMs);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
      console.log('[Notification Scheduler] Stopped.');
    }
  }

  async processPendingNotifications() {
    try {
      // Find notifications that are scheduled to be sent and are pending
      const [pending] = await db.execute(`
        SELECT *
        FROM notifications 
        WHERE status = 'pending' 
          AND scheduled_for IS NOT NULL 
          AND scheduled_for <= NOW()
      `);

      if (pending.length === 0) return;

      console.log(`[Notification Scheduler] Found ${pending.length} pending notifications. Processing...`);

      for (const notif of pending) {
        // Mock sending mechanisms based on settings
        if (notif.send_email) {
          console.log(`[MOCK EMAIL] Sending email to User ${notif.user_id || 'All Users'} - Subject: ${notif.title}`);
        }

        if (notif.send_push) {
          console.log(`[MOCK PUSH] Sending push notification to User ${notif.user_id || 'All Users'} - Title: ${notif.title}`);
        }

        // Send in-app notification by updating status
        await db.execute(
          "UPDATE notifications SET status = 'sent' WHERE id = ?",
          [notif.id]
        );
        
        console.log(`[Notification Scheduler] Successfully processed Notification #${notif.id}`);
      }

    } catch (err) {
      console.error('[Notification Scheduler] Error processing notifications:', err);
    }
  }
}

module.exports = new NotificationScheduler();
