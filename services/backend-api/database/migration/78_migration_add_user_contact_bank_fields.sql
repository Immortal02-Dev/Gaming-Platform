-- 78_migration_add_user_contact_bank_fields.sql
-- Adds phone, bank, and display fields to users table for the admin basic info form.

ALTER TABLE users
ADD COLUMN IF NOT EXISTS phone_number VARCHAR(50) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS bank_account VARCHAR(100) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS bank_depositor VARCHAR(100) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS bank_idx INT DEFAULT NULL,
ADD COLUMN IF NOT EXISTS charge_bank_idx INT DEFAULT NULL,
ADD COLUMN IF NOT EXISTS warning_color_idx TINYINT DEFAULT NULL;
