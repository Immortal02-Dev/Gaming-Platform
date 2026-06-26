-- Seed Referral Stats for user 1 (existing admin/test user)
INSERT IGNORE INTO referral_stats (user_id, total_rewards, total_friends, referral_code, referral_link)
VALUES (1, 150.50, 12, 'REF-12345', 'http://localhost:3000/referral/REF-12345');

-- Seed Referral Rewards for user 1
INSERT IGNORE INTO referral_rewards (user_id, friend_name, amount, currency, status)
VALUES 
(1, 'John Doe', 10.00, 'BCD', 'claimed'),
(1, 'Jane Smith', 5.50, 'BCD', 'claimed'),
(1, 'Bob Brown', 25.00, 'BCD', 'pending'),
(1, 'Alice Green', 100.00, 'BCD', 'claimed');
