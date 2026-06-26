-- 31_seed_referral_friends.sql
-- Seed sample referral friends, codes, milestones and live activities.

-- Seed level-up milestones (from Rules page)
INSERT IGNORE INTO referral_level_up_milestones (vip_level, wager_threshold, reward_amount)
VALUES
  (4, 1000, 0.50),
  (8, 5000, 2.50),
  (14, 17000, 5.00),
  (22, 49000, 12.00),
  (30, 129000, 25.00),
  (38, 321000, 50.00),
  (46, 769000, 80.00),
  (54, 1793000, 120.00),
  (62, 4097000, 205.00),
  (70, 9217000, 500.00);

-- Update referral_stats with new columns for user 1
UPDATE referral_stats
SET available_commission = 25.00, locked_referral = 50.00
WHERE user_id = 1;

-- Seed referral friends for user 1
INSERT IGNORE INTO referral_friends (referrer_id, friend_user_id, commission_rate, total_deposits_7d, total_commission, friend_vip_level, registered_at)
VALUES
  (1, 2, 25.00, 120.00, 30.00, 5, DATE_SUB(NOW(), INTERVAL 10 DAY)),
  (1, 3, 25.00, 0.00, 5.50, 2, DATE_SUB(NOW(), INTERVAL 20 DAY));

-- Seed referral codes for user 1
INSERT IGNORE INTO referral_codes (user_id, code, link)
VALUES
  (1, 'REF-123', 'http://localhost:3000/referral/REF-123'),
  (1, 'BC-VIP-01', 'http://localhost:3000/referral/BC-VIP-01');

-- Seed live reward ticker
INSERT IGNORE INTO referral_live_rewards (username, amount, currency)
VALUES
  ('ToTheRungkat', 0.08, 'USDT'),
  ('Bmlorejictcc', 2.50, 'USDT'),
  ('Shez27', 0.50, 'USDT'),
  ('Hui111', 5.00, 'USDT'),
  ('Fhhbxckecrac', 0.17, 'USDT'),
  ('6Hack6shaw6', 0.08, 'BCD'),
  ('Dimzlo1', 0.06, 'BCD');
