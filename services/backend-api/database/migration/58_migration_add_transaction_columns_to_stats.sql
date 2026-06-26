-- 58_migration_add_transaction_columns_to_stats.sql
-- Adds more granular transaction columns to partner_statistics to support advanced reporting.

ALTER TABLE partner_statistics
ADD COLUMN money_deposit DECIMAL(20, 8) DEFAULT 0 AFTER final_profit,
ADD COLUMN money_withdrawal DECIMAL(20, 8) DEFAULT 0 AFTER money_deposit,
ADD COLUMN point_deposit DECIMAL(20, 8) DEFAULT 0 AFTER money_withdrawal,
ADD COLUMN point_withdrawal DECIMAL(20, 8) DEFAULT 0 AFTER point_deposit;
