-- 54_migration_agent_system.sql
-- Adds agent flag and custom commission overrides to users table.

ALTER TABLE users 
ADD COLUMN IF NOT EXISTS is_agent TINYINT(1) DEFAULT 0,
ADD COLUMN IF NOT EXISTS custom_commission DECIMAL(5, 2) DEFAULT NULL,
ADD COLUMN IF NOT EXISTS agent_level INT DEFAULT 1;

-- Seed system default commission if not exists in platform_settings
INSERT INTO platform_settings (setting_key, setting_value) 
VALUES ('default_referral_commission', '25.00')
ON DUPLICATE KEY UPDATE setting_value = setting_value;

-- Optional: Promote an existing user to Agent for testing
-- UPDATE users SET is_agent = 1, custom_commission = 35.00 WHERE id = 1;
