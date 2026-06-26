-- 44_update_lottery_schema.sql
-- Add winning_numbers and is_drawn columns to the lotteries table.

ALTER TABLE lotteries 
ADD COLUMN winning_numbers JSON DEFAULT NULL AFTER prize_pool,
ADD COLUMN is_drawn BOOLEAN DEFAULT FALSE AFTER winning_numbers;

ALTER TABLE lottery_bets
ADD COLUMN payout DECIMAL(20, 8) DEFAULT 0 AFTER amount;

