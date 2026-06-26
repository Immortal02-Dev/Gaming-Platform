-- 12_migration_daily_contest.sql
-- Tables to support the Daily Contest feature.

CREATE TABLE IF NOT EXISTS daily_contest_participants (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  contest_id INT NOT NULL,
  wager_amount DECIMAL(20, 8) DEFAULT 0,
  current_rank INT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  UNIQUE KEY (user_id, contest_id)
);

CREATE TABLE IF NOT EXISTS daily_contest_history (
  id INT AUTO_INCREMENT PRIMARY KEY,
  contest_id INT NOT NULL,
  user_id INT NOT NULL,
  rank INT NOT NULL,
  prize_amount DECIMAL(20, 8) NOT NULL,
  won_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
