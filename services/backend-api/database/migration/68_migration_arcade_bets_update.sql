-- Migration: Add missing financial columns to arcade_bets
ALTER TABLE arcade_bets
ADD COLUMN before_money DECIMAL(20,2) NOT NULL DEFAULT 0.00 AFTER odds,
ADD COLUMN after_money DECIMAL(20,2) NOT NULL DEFAULT 0.00 AFTER bet_money,
ADD COLUMN win_before_money DECIMAL(20,2) NOT NULL DEFAULT 0.00 AFTER after_money,
ADD COLUMN win_after_money DECIMAL(20,2) NOT NULL DEFAULT 0.00 AFTER win_money,
ADD COLUMN is_deleted TINYINT(1) NOT NULL DEFAULT 0 AFTER bet_time;
