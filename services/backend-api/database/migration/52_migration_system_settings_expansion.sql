-- Migration 52: API Key Management & Language Localization
-- Created: 2026-04-21

-- Table for secure API Key storage
CREATE TABLE IF NOT EXISTS platform_api_keys (
  id INT AUTO_INCREMENT PRIMARY KEY,
  provider_name VARCHAR(100) UNIQUE NOT NULL,
  api_key TEXT NOT NULL,           -- Encrypted value
  api_secret TEXT NULL,            -- Optional encrypted secret
  environment ENUM('sandbox', 'production') DEFAULT 'production',
  is_active BOOLEAN DEFAULT TRUE,
  provider_type VARCHAR(50) NULL,  -- 'odds', 'games', 'payments', etc
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table for Language management
CREATE TABLE IF NOT EXISTS platform_languages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(10) UNIQUE NOT NULL, -- 'en', 'kr', 'vi'
  name VARCHAR(50) NOT NULL,        -- 'English', 'Korean'
  is_active BOOLEAN DEFAULT TRUE,
  is_default BOOLEAN DEFAULT FALSE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed initial basic data
INSERT IGNORE INTO platform_languages (code, name, is_active, is_default, sort_order) VALUES
('en', 'English', TRUE, TRUE, 1),
('kr', 'Korean', TRUE, FALSE, 2),
('vi', 'Vietnamese', TRUE, FALSE, 3),
('jp', 'Japanese', TRUE, FALSE, 4),
('zh', 'Chinese', TRUE, FALSE, 5);

-- Seed existing providers placeholder (will be updated via UI with encrypted keys)
INSERT IGNORE INTO platform_api_keys (provider_name, provider_type, environment) VALUES
('odds_api', 'odds', 'production'),
('nba_stats', 'sports', 'production'),
('nowpayments', 'payments', 'production');
