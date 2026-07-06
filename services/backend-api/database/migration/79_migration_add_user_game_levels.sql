-- 79_migration_add_user_game_levels.sql
-- Adds individual game level columns to the users table.

ALTER TABLE users
ADD COLUMN IF NOT EXISTS sport_level INT DEFAULT 1,
ADD COLUMN IF NOT EXISTS casino_level INT DEFAULT 1,
ADD COLUMN IF NOT EXISTS slot_level INT DEFAULT 1,
ADD COLUMN IF NOT EXISTS mini_game_level INT DEFAULT 1,
ADD COLUMN IF NOT EXISTS board_game_level INT DEFAULT 1;
