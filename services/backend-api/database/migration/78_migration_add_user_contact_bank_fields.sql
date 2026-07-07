-- 78_migration_add_user_contact_bank_fields.sql
-- Adds phone, bank, and display fields to users table for the admin basic info form.

ALTER TABLE users
ADD COLUMN phone_number VARCHAR(50) DEFAULT NULL,
ADD COLUMN bank_account VARCHAR(100) DEFAULT NULL,
ADD COLUMN bank_depositor VARCHAR(100) DEFAULT NULL,
ADD COLUMN bank_idx INT DEFAULT NULL,
ADD COLUMN charge_bank_idx INT DEFAULT NULL,
ADD COLUMN warning_color_idx TINYINT DEFAULT NULL;
