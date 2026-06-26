-- Migration: Create arcade settings table
-- Settings for arcade games (odds, limits, etc.)

CREATE TABLE IF NOT EXISTS arcade_settings (
  id INT(11) NOT NULL AUTO_INCREMENT,
  game_type_id INT(11) NOT NULL COMMENT 'FK -> arcade_game_types.id',
  setting_key VARCHAR(100) NOT NULL COMMENT 'e.g. min_bet, max_bet, odds_multiplier',
  setting_value VARCHAR(255) NOT NULL COMMENT 'Value as string',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_arcade_settings_type_key (game_type_id, setting_key),
  CONSTRAINT fk_arcade_settings_game_type FOREIGN KEY (game_type_id) REFERENCES arcade_game_types (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default settings for each game type
INSERT IGNORE INTO arcade_settings (game_type_id, setting_key, setting_value) VALUES
-- 파워볼(PBG)
(4, 'min_bet', '100'),
(4, 'max_bet', '100000'),
(4, 'odds_base', '1.95'),
(4, 'commission', '0.05'),

-- EOS파워볼5분
(10, 'min_bet', '100'),
(10, 'max_bet', '100000'),
(10, 'odds_base', '1.95'),
(10, 'commission', '0.05'),

-- EOS파워볼3분
(11, 'min_bet', '100'),
(11, 'max_bet', '100000'),
(11, 'odds_base', '1.95'),
(11, 'commission', '0.05'),

-- 코인파워볼5분
(12, 'min_bet', '100'),
(12, 'max_bet', '100000'),
(12, 'odds_base', '1.95'),
(12, 'commission', '0.05'),

-- 코인파워볼3분
(13, 'min_bet', '100'),
(13, 'max_bet', '100000'),
(13, 'odds_base', '1.95'),
(13, 'commission', '0.05'),

-- 코인사다리5분
(14, 'min_bet', '100'),
(14, 'max_bet', '100000'),
(14, 'odds_base', '1.95'),
(14, 'commission', '0.05'),

-- 코인사다리3분
(15, 'min_bet', '100'),
(15, 'max_bet', '100000'),
(15, 'odds_base', '1.95'),
(15, 'commission', '0.05');