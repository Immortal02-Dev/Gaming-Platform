-- Migration: Create sport betting tables
CREATE TABLE IF NOT EXISTS sport_bet_orders (
  id INT(11) NOT NULL AUTO_INCREMENT,
  user_id INT(11) NOT NULL,
  bet_status ENUM('pending', 'win', 'lose', 'cancelled', 'cancelled_by_user') NOT NULL DEFAULT 'pending',
  type_flag TINYINT(1) NOT NULL DEFAULT 1 COMMENT '1=prematch, 2=live',
  type_cross_special TINYINT(1) NOT NULL DEFAULT 1 COMMENT '1=cross, 2=special, 3=total',
  folder_count INT(11) NOT NULL DEFAULT 1,
  total_odds DECIMAL(10,2) NOT NULL DEFAULT 1.00,
  bet_money DECIMAL(20,2) NOT NULL DEFAULT 0.00,
  expect_win_money DECIMAL(20,2) NOT NULL DEFAULT 0.00,
  win_money DECIMAL(20,2) NOT NULL DEFAULT 0.00,
  bet_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  result_time TIMESTAMP NULL DEFAULT NULL,
  is_deleted TINYINT(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  KEY idx_sbo_user_id (user_id),
  KEY idx_sbo_bet_status (bet_status),
  KEY idx_sbo_bet_time (bet_time),
  CONSTRAINT fk_sbo_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS sport_bet_details (
  id INT(11) NOT NULL AUTO_INCREMENT,
  order_id INT(11) NOT NULL,
  match_id INT(11) NOT NULL,
  market_name VARCHAR(100) NOT NULL,
  selection VARCHAR(100) NOT NULL,
  odds DECIMAL(10,2) NOT NULL DEFAULT 1.00,
  game_result ENUM('pending', 'win', 'lose', 'cancelled') NOT NULL DEFAULT 'pending',
  folder_cancelled TINYINT(1) NOT NULL DEFAULT 0,
  result_time TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (id),
  KEY idx_sbd_order_id (order_id),
  KEY idx_sbd_match_id (match_id),
  CONSTRAINT fk_sbd_order FOREIGN KEY (order_id) REFERENCES sport_bet_orders (id) ON DELETE CASCADE,
  CONSTRAINT fk_sbd_match FOREIGN KEY (match_id) REFERENCES match_events (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
