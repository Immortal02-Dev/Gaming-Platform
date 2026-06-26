-- Migration: Create arcade games tables (Korean mini-game system)
-- Game type definitions (파워볼, EOS파워볼 etc.)
CREATE TABLE IF NOT EXISTS arcade_game_types (
  id INT(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL COMMENT 'e.g. 파워볼(PBG)',
  slug VARCHAR(100) NOT NULL,
  interval_minutes INT(11) NOT NULL DEFAULT 5 COMMENT 'Draw interval in minutes',
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_arcade_game_types_slug (slug)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Game rounds (each individual draw/inning)
CREATE TABLE IF NOT EXISTS arcade_game_list (
  id INT(11) NOT NULL AUTO_INCREMENT,
  game_type_id INT(11) NOT NULL COMMENT 'FK -> arcade_game_types.id',
  game_inning VARCHAR(50) NOT NULL COMMENT 'Global round number e.g. 202600123',
  game_today_inning VARCHAR(20) NOT NULL COMMENT 'Daily inning e.g. 45',
  game_arcade_status TINYINT(1) NOT NULL DEFAULT 1 COMMENT '1=베팅가능, 2=베팅마감, 3=결과마감, 4=취소',
  bet_money DECIMAL(20,2) NOT NULL DEFAULT 0,
  win_money DECIMAL(20,2) NOT NULL DEFAULT 0,
  game_time DATETIME NOT NULL COMMENT 'Draw start time',
  bet_close_time DATETIME NOT NULL COMMENT 'Betting close time',
  result_time DATETIME DEFAULT NULL COMMENT 'Result announced time',
  result_data JSON DEFAULT NULL COMMENT 'JSON with ball numbers, ladder result etc.',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_agl_game_type_id (game_type_id),
  KEY idx_agl_game_time (game_time),
  KEY idx_agl_status (game_arcade_status),
  KEY idx_agl_inning (game_inning),
  CONSTRAINT fk_agl_game_type FOREIGN KEY (game_type_id) REFERENCES arcade_game_types (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Betting records for arcade games
CREATE TABLE IF NOT EXISTS arcade_bets (
  id INT(11) NOT NULL AUTO_INCREMENT,
  game_list_id INT(11) NOT NULL COMMENT 'FK -> arcade_game_list.id',
  game_type_id INT(11) NOT NULL,
  user_id INT(11) NOT NULL COMMENT 'FK -> users.id',
  bet_item VARCHAR(100) NOT NULL COMMENT 'e.g. 파워 홀, 일반 짝',
  odds DECIMAL(10,2) NOT NULL DEFAULT 1.95,
  bet_money DECIMAL(20,2) NOT NULL DEFAULT 0,
  win_money DECIMAL(20,2) NOT NULL DEFAULT 0,
  bet_status TINYINT(1) NOT NULL DEFAULT 0 COMMENT '0=대기, 1=당첨, 2=낙첨, 3=취소',
  bet_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_ab_game_list_id (game_list_id),
  KEY idx_ab_user_id (user_id),
  KEY idx_ab_game_type_id (game_type_id),
  KEY idx_ab_bet_status (bet_status),
  CONSTRAINT fk_ab_game_list FOREIGN KEY (game_list_id) REFERENCES arcade_game_list (id),
  CONSTRAINT fk_ab_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
