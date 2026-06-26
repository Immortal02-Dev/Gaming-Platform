-- 57_migration_add_nickname_to_users.sql
-- Adds nickname column to users table to support administrative displays.

ALTER TABLE users 
ADD COLUMN IF NOT EXISTS nickname VARCHAR(100) DEFAULT NULL AFTER username;

-- Update existing nicknames to match usernames
UPDATE users SET nickname = username WHERE nickname IS NULL;
