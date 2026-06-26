-- Seed Bonus Stats for user 1
INSERT IGNORE INTO user_bonus_stats (user_id, total_claimed, vip_bonus, special_bonus, general_bonus, locked_bonus, deposit_bonus_progress)
VALUES (1, 10500.00, 2500.00, 1000.00, 500.00, 1429.00, 180.00);

-- Seed Swap Rates
INSERT IGNORE INTO swap_rates (from_coin, to_coin, rate, fee_percentage)
VALUES 
('USDT', 'BC', 142.06, 1.00),
('BTC', 'BC', 9500000.00, 1.00),
('ETH', 'BC', 450000.00, 1.00);
