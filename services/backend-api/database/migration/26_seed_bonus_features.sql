-- Seed promo codes
INSERT IGNORE INTO promo_codes (code, reward_type, reward_amount) VALUES ('WELCOMEBCD', 'BCD', 10.00);

-- Seed user rakeback
INSERT IGNORE INTO user_rakeback (user_id, locked_bcd, unlock_rate, ready_to_claim, next_claim_time) 
VALUES (1, 1.00, 20.00, 0.50, DATE_ADD(NOW(), INTERVAL 23 HOUR));

-- Seed user tasks
INSERT IGNORE INTO user_tasks (user_id, task_name, status, reward_amount)
VALUES 
(1, 'Phone Verification', 'pending', 1.00),
(1, 'Telegram Subscription', 'pending', 2.00);

-- Seed user spins
INSERT IGNORE INTO user_spins (user_id, daily_spins_available, last_spin_time)
VALUES (1, 1, DATE_SUB(NOW(), INTERVAL 1 DAY));

-- Seed user vault stats
INSERT IGNORE INTO user_vault_stats (user_id, balance, total_return)
VALUES (1, 50.00, 5.25);
