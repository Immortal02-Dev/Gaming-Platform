-- 13_seed_quest_data.sql
-- Seed initial quest data based on the frontend's hardcoded values in QuestsPage.tsx.

INSERT IGNORE INTO quests (type, title, description, reward_amount, reward_currency, goal_value)
VALUES 
('daily', 'Baccarat Multiplayer Master', 'Winning streak of 3 rounds in Baccarat Multiplayer with bets greater than $ 0.4.', 0.1, 'BCD', 3),
('daily', 'Wheel Master', 'Winning streak of 3 rounds in Wheel with bets greater than $ 0.4.', 0.1, 'BCD', 3),
('daily', 'Just wager on', 'Daily wager reaches $ 100.', 0.2, 'BCD', 100),
('weekly', 'Activate Rakeback Bonus Boost!', 'Place total bets of at least 700 this week to activate a Rakeback Boost. For the next 60 minutes, all your Rakeback rewards will be increased by 10%!', 700, 'BCD', 700);
