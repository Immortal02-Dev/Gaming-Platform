-- 08_migration_lottery.sql
-- Create the lotteries table to store lottery game information.

CREATE TABLE IF NOT EXISTS lotteries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  draw_time DATETIME NOT NULL,
  prize_pool VARCHAR(255) NOT NULL,
  icon_src VARCHAR(255),
  icon_offset_y INT DEFAULT 0,
  is_exclusive BOOLEAN DEFAULT FALSE,
  is_popular BOOLEAN DEFAULT FALSE,
  category VARCHAR(50) DEFAULT 'lottery',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS lottery_bets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  lottery_id INT NOT NULL,
  balls JSON NOT NULL,
  amount DECIMAL(20, 8) NOT NULL,
  currency VARCHAR(10) DEFAULT 'BCD',
  status ENUM('pending', 'won', 'lost') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (lottery_id) REFERENCES lotteries(id)
);
