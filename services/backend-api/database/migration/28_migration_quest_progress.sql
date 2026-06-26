-- 28_migration_quest_progress.sql
-- Tracks each user's progress on each active quest per period.

CREATE TABLE IF NOT EXISTS user_quest_progress (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  quest_id INT NOT NULL,
  current_value DECIMAL(18, 8) DEFAULT 0,
  status ENUM('pending', 'completed', 'claimed') DEFAULT 'pending',
  period_date DATE NOT NULL COMMENT 'For daily quests: today. For weekly quests: start of ISO week.',
  UNIQUE KEY uq_user_quest_period (user_id, quest_id, period_date),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (quest_id) REFERENCES quests(id)
);
