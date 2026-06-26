-- Security & Risk Management Migration

-- 1. IP Blacklist Table
CREATE TABLE IF NOT EXISTS ip_blacklist (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ip_address VARCHAR(45) NOT NULL UNIQUE,
    reason VARCHAR(255),
    blocked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NULL,
    INDEX (ip_address)
);

-- 2. Login Attempt Monitoring Table
CREATE TABLE IF NOT EXISTS login_attempts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ip_address VARCHAR(45) NOT NULL,
    username VARCHAR(100) NOT NULL,
    attempts INT DEFAULT 1,
    last_attempt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    lockout_until TIMESTAMP NULL,
    UNIQUE KEY (ip_address, username)
);

-- 3. Bet Limits Table
CREATE TABLE IF NOT EXISTS bet_limits (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category ENUM('global', 'casino', 'sports', 'trading') NOT NULL UNIQUE,
    min_bet DECIMAL(20, 8) DEFAULT 0,
    max_bet DECIMAL(20, 8) DEFAULT 1000000,
    is_active BOOLEAN DEFAULT TRUE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- 4. Fraud Rules Table
CREATE TABLE IF NOT EXISTS fraud_rules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    criteria_json JSON, -- stores thresholds e.g. {"win_rate": 180, "min_bets": 50}
    action ENUM('flag', 'suspend', 'notify') DEFAULT 'flag',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed defaults for bet limits
INSERT INTO bet_limits (category, min_bet, max_bet) VALUES 
('global', 0.1, 10000),
('casino', 0.1, 5000),
('sports', 1, 2000),
('trading', 10, 1000)
ON DUPLICATE KEY UPDATE updated_at = CURRENT_TIMESTAMP;

-- Seed basic fraud rules
INSERT INTO fraud_rules (name, description, criteria_json, action) VALUES 
('Abnormal Win Rate', 'Detects users with > 200% win rate on over 100 bets', '{"win_rate": 200, "min_bets": 100}', 'flag'),
('IP Overlap', 'Detects multiple accounts logged in from the same IP', '{"max_accounts": 3}', 'notify'),
('Massive First Bet', 'Detects unusually large bets from brand new accounts', '{"max_first_bet": 500, "max_account_age_hours": 1}', 'suspend')
ON DUPLICATE KEY UPDATE created_at = CURRENT_TIMESTAMP;

-- Add blocked_countries setting to platform_settings if not exists
INSERT IGNORE INTO platform_settings (setting_key, setting_value) VALUES ('blocked_countries', '[]');
