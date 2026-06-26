-- 22_seed_contest_raffle_data.sql
-- Seed data for participants and ticket holders.

INSERT IGNORE INTO daily_contest_participants (user_id, contest_id, wager_amount, current_rank)
VALUES 
(1, 1, 150.00, 1),
(2, 1, 120.00, 2),
(3, 1, 100.00, 3);

INSERT IGNORE INTO weekly_raffle_tickets (user_id, raffle_id, ticket_count)
VALUES 
(1, 1, 15),
(2, 1, 8),
(3, 1, 5);
