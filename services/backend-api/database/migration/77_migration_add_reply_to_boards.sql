-- Migration: Add reply columns to boards table
ALTER TABLE boards ADD COLUMN reply_content LONGTEXT NULL AFTER content;
ALTER TABLE boards ADD COLUMN replied_at TIMESTAMP NULL AFTER updated_at;
ALTER TABLE boards ADD COLUMN reply_user_id INT NULL AFTER replied_at;
ALTER TABLE boards ADD CONSTRAINT fk_board_reply_user FOREIGN KEY (reply_user_id) REFERENCES users (id) ON DELETE SET NULL;
