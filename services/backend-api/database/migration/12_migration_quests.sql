-- 12_migration_quests.sql
-- Create a quests table to store daily and weekly tasks.

CREATE TABLE IF NOT EXISTS quests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  type ENUM('daily', 'weekly') NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  reward_amount DECIMAL(18,8) NOT NULL,
  reward_currency VARCHAR(20) DEFAULT 'BCD',
  goal_value DECIMAL(18,8) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
