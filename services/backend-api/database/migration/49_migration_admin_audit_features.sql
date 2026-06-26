-- 49_migration_admin_audit_features.sql
-- New fields for Admin control across categories 1-5

-- 1. User Management Improvements
ALTER TABLE users
ADD COLUMN kyc_status ENUM('none', 'pending', 'verified', 'rejected') DEFAULT 'none',
ADD COLUMN kyc_notes TEXT DEFAULT NULL,
ADD COLUMN is_muted TINYINT(1) DEFAULT 0;

-- Login History tracking
CREATE TABLE IF NOT EXISTS user_login_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    ip_address VARCHAR(45) NOT NULL,
    device_info TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 2. Finance & Wallet (Fees in platform_settings)
INSERT INTO platform_settings (setting_key, setting_value) VALUES
('fee_deposit_percent', '0.00'),
('fee_withdraw_percent', '1.00'),
('bonus_welcome_percent', '10.00'),
('bonus_deposit_min_amount', '10.00'),
('cashback_percent', '5.00')
ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value);

-- 4. Casino / Slot Controls
ALTER TABLE games ADD COLUMN is_maintenance TINYINT(1) DEFAULT 0;
ALTER TABLE providers ADD COLUMN is_maintenance TINYINT(1) DEFAULT 0;

-- 5. Sports Betting Controls
ALTER TABLE match_events ADD COLUMN max_bet DECIMAL(18, 8) DEFAULT 1000.00;
ALTER TABLE match_odds ADD COLUMN original_odds DECIMAL(10, 2) DEFAULT NULL;
ALTER TABLE match_odds ADD COLUMN is_overridden TINYINT(1) DEFAULT 0;
