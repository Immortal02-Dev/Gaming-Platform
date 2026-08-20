-- Dedicated arcade game-code and pick settings used by the admin settings tabs.
CREATE TABLE IF NOT EXISTS arcade_game_codes (
  id INT NOT NULL AUTO_INCREMENT,
  game_type_id INT NOT NULL,
  game_code_idx INT NOT NULL,
  code_name VARCHAR(100) NOT NULL,
  use_yn TINYINT(1) NOT NULL DEFAULT 0,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_arcade_game_code (game_type_id, game_code_idx),
  CONSTRAINT fk_arcade_game_code_type FOREIGN KEY (game_type_id)
    REFERENCES arcade_game_types (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS arcade_game_picks (
  id INT NOT NULL AUTO_INCREMENT,
  game_code_id INT NOT NULL,
  game_pick_idx INT NOT NULL,
  label VARCHAR(100) NOT NULL,
  odds DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_arcade_game_pick (game_code_id, game_pick_idx),
  CONSTRAINT fk_arcade_game_pick_code FOREIGN KEY (game_code_id)
    REFERENCES arcade_game_codes (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT IGNORE INTO arcade_game_codes
  (game_type_id, game_code_idx, code_name, use_yn, sort_order)
SELECT game_type_id, game_code_idx, code_name, 0, sort_order
FROM (
  SELECT agt.id AS game_type_id, 6 AS game_code_idx, '파워볼' AS code_name, 1 AS sort_order FROM arcade_game_types agt
  UNION ALL SELECT agt.id, 7, '일반볼', 2 FROM arcade_game_types agt
  UNION ALL SELECT agt.id, 8, '파워볼 조합', 3 FROM arcade_game_types agt
  UNION ALL SELECT agt.id, 9, '일반볼 조합', 4 FROM arcade_game_types agt
  UNION ALL SELECT agt.id, 10, '일반볼 대중소', 5 FROM arcade_game_types agt
  UNION ALL SELECT agt.id, 11, '파워볼+일반볼 조합', 6 FROM arcade_game_types agt
  UNION ALL SELECT agt.id, 13, '파워볼 숫자 맞추기', 7 FROM arcade_game_types agt
  UNION ALL SELECT agt.id, 14, '일반 홀짝+일반 언오버+파워 홀짝', 8 FROM arcade_game_types agt
) AS code_seed;

INSERT IGNORE INTO arcade_game_picks
  (game_code_id, game_pick_idx, label, odds, sort_order)
SELECT agc.id, pick_seed.game_pick_idx, pick_seed.label, 0, pick_seed.sort_order
FROM arcade_game_codes agc
INNER JOIN (
  SELECT 6 AS game_code_idx, 1 AS game_pick_idx, '파워 홀' AS label, 1 AS sort_order
  UNION ALL SELECT 6, 2, '파워 짝', 2 UNION ALL SELECT 6, 3, '파워 언더', 3 UNION ALL SELECT 6, 4, '파워 오버', 4
  UNION ALL SELECT 7, 5, '일반 홀', 1 UNION ALL SELECT 7, 6, '일반 짝', 2 UNION ALL SELECT 7, 7, '일반 언더', 3 UNION ALL SELECT 7, 8, '일반 오버', 4
  UNION ALL SELECT 8, 9, '홀+언더', 1 UNION ALL SELECT 8, 10, '홀+오버', 2 UNION ALL SELECT 8, 11, '짝+언더', 3 UNION ALL SELECT 8, 12, '짝+오버', 4
  UNION ALL SELECT 9, 13, '홀+언더', 1 UNION ALL SELECT 9, 14, '홀+오버', 2 UNION ALL SELECT 9, 15, '짝+언더', 3 UNION ALL SELECT 9, 16, '짝+오버', 4
  UNION ALL SELECT 10, 17, '일반볼 대', 1 UNION ALL SELECT 10, 18, '일반볼 중', 2 UNION ALL SELECT 10, 19, '일반볼 소', 3
  UNION ALL SELECT 11, 20, '파홀+일홀', 1 UNION ALL SELECT 11, 21, '파홀+일짝', 2 UNION ALL SELECT 11, 22, '파짝+일홀', 3 UNION ALL SELECT 11, 23, '파짝+일짝', 4
  UNION ALL SELECT 11, 24, '파언+일언', 5 UNION ALL SELECT 11, 25, '파언+일옵', 6 UNION ALL SELECT 11, 26, '파옵+일언', 7 UNION ALL SELECT 11, 27, '파옵+일옵', 8
  UNION ALL SELECT 13, 28, '0', 1 UNION ALL SELECT 13, 29, '1', 2 UNION ALL SELECT 13, 30, '2', 3 UNION ALL SELECT 13, 31, '3', 4 UNION ALL SELECT 13, 32, '4', 5
  UNION ALL SELECT 13, 33, '5', 6 UNION ALL SELECT 13, 34, '6', 7 UNION ALL SELECT 13, 35, '7', 8 UNION ALL SELECT 13, 36, '8', 9 UNION ALL SELECT 13, 37, '9', 10
  UNION ALL SELECT 14, 38, '홀+언더+P홀', 1 UNION ALL SELECT 14, 39, '홀+언더+P짝', 2 UNION ALL SELECT 14, 40, '홀+오버+P홀', 3 UNION ALL SELECT 14, 41, '홀+오버+P짝', 4
  UNION ALL SELECT 14, 42, '짝+언더+P홀', 5 UNION ALL SELECT 14, 43, '짝+언더+P짝', 6 UNION ALL SELECT 14, 44, '짝+오버+P홀', 7 UNION ALL SELECT 14, 45, '짝+오버+P짝', 8
) AS pick_seed ON pick_seed.game_code_idx = agc.game_code_idx;
