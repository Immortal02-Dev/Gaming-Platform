-- 79_migration_add_user_game_levels.sql
-- Adds individual game level columns to the users table.

ALTER TABLE users
ADD COLUMN sport_level INT DEFAULT 1,
ADD COLUMN casino_level INT DEFAULT 1,
ADD COLUMN slot_level INT DEFAULT 1,
ADD COLUMN mini_game_level INT DEFAULT 1,
ADD COLUMN board_game_level INT DEFAULT 1;
