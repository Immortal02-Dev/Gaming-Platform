-- 13_migration_weekly_raffle.sql
-- Tables to support the Weekly Raffle feature.

CREATE TABLE IF NOT EXISTS weekly_raffle_tickets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  raffle_id INT NOT NULL,
  ticket_count INT DEFAULT 0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  UNIQUE KEY (user_id, raffle_id)
);

CREATE TABLE IF NOT EXISTS weekly_raffle_history (
  id INT AUTO_INCREMENT PRIMARY KEY,
  raffle_id INT NOT NULL,
  user_id INT NOT NULL,
  is_winner BOOLEAN DEFAULT FALSE,
  prize_amount DECIMAL(20, 8) DEFAULT 0,
  won_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
