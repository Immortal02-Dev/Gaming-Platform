-- 11_seed_promotion_data.sql
-- Seed initial promotion data based on the frontend's hardcoded values in PromotionTabs.tsx.

INSERT IGNORE INTO promotions (slug, title, description, image_url, category, status, ends_at, is_exclusive, type, config)
VALUES 
('0-house-edge-instant-rakeback', '0 House Edge • Instant Rakeback', 'Enjoy 0 house edge and instant rakeback on selected games.', 'https://imgxcut.com/bc_event/9e7dec6536.png?_v=4,dpr=1,width=800', 'all', 'active', '2026-03-01 07:59:59', TRUE, 'general', NULL),
('torture-block', 'New BC Exclusive - Torture Block', 'Experience the thrill of our new BC exclusive game, Torture Block.', 'https://imgxcut.com/bc_event/a06ad79be9.png?_v=4,dpr=1,width=800', 'bc-exclusive', 'active', '2026-01-28 09:59:59', FALSE, 'general', NULL),
('gods-go-pew-pew', 'New Release: Gods Go Pew Pew', 'Join the gods in our latest release and win big!', 'https://imgxcut.com/bc_event/8dcbf6e857.png?_v=4,dpr=1,width=800', 'casino', 'active', '2026-01-29 07:59:59', FALSE, 'general', NULL),
('mystery-free-chips', 'Mystery Free Chips Giveaway!', 'Don''t miss out on our mystery free chips giveaway.', 'https://imgxcut.com/bc_event/25be22a30d.png?_v=4,dpr=1,width=800', 'all', 'active', '2026-02-28 07:59:59', FALSE, 'general', NULL),
('bgaming-millions-of-drops', 'BGaming Millions of Drops', 'Win your share of millions in the BGaming prize drops.', 'https://imgxcut.com/bc_event/8298893cac.png?_v=4,dpr=1,width=800', 'casino', 'active', '2026-02-01 07:59:59', FALSE, 'general', NULL),
('sport-weekly-bonus', 'Sport Weekly Bonus', 'Get a weekly bonus for your sports betting activities.', 'https://imgxcut.com/bc_event/1424fd1ec0.png?_v=4,dpr=1,width=800', 'sports', 'active', '2026-04-01 07:59:59', FALSE, 'general', NULL),
('daily-contest', 'Daily Contest', 'Participate in our daily contest and win big!', 'https://bc.game/substation/bc/platform/contest/trophy.png', 'all', 'active', '2026-03-17 12:00:00', FALSE, 'daily_contest', '{"prize_pool": "83,929.43 BCD"}'),
('weekly-raffle', 'Weekly Raffle', 'Join our weekly raffle for a chance to win amazing prizes.', 'https://bc.game/substation/bc/platform/contest/winner.png', 'all', 'active', '2026-03-22 12:00:00', FALSE, 'weekly_raffle', '{"prize_pool": "₩29,335,862"}');
