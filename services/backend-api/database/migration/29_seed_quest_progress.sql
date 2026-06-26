-- 29_seed_quest_progress.sql
-- Seed sample quest progress for user 1.

INSERT IGNORE INTO user_quest_progress (user_id, quest_id, current_value, status, period_date)
VALUES
  (1, 1, 2, 'pending', CURDATE()),
  (1, 2, 3, 'completed', CURDATE()),
  (1, 3, 45.00, 'pending', CURDATE()),
  (1, 4, 0.00, 'pending', DATE(DATE_SUB(CURDATE(), INTERVAL WEEKDAY(CURDATE()) DAY)));
