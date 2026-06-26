-- Migration: Advanced Notifications (Scheduled, Email, Push)
ALTER TABLE notifications
ADD COLUMN scheduled_for DATETIME DEFAULT NULL,
ADD COLUMN status ENUM('pending', 'sent', 'failed') DEFAULT 'sent',
ADD COLUMN send_email BOOLEAN DEFAULT FALSE,
ADD COLUMN send_push BOOLEAN DEFAULT FALSE;
