-- 48_migration_platform_admin_features.sql
-- Schema for Banners, Swap Rates, and Currencies

-- Banners Table
CREATE TABLE IF NOT EXISTS banners (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    image TEXT NOT NULL,
    href VARCHAR(255) DEFAULT '/',
    gradient_color VARCHAR(100),
    sort_order INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    is_promo TINYINT(1) DEFAULT 0,
    badge_image TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Swap Rates Table
DROP TABLE IF EXISTS swap_rates;
CREATE TABLE IF NOT EXISTS swap_rates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    from_currency VARCHAR(20) NOT NULL,
    to_currency VARCHAR(20) NOT NULL,
    rate DECIMAL(36, 18) NOT NULL,
    fee_percent DECIMAL(5, 2) DEFAULT 1.00,
    min_amount DECIMAL(36, 18) DEFAULT 0,
    max_amount DECIMAL(36, 18) DEFAULT 999999999,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY (from_currency, to_currency)
);

-- Currencies Table
CREATE TABLE IF NOT EXISTS platform_currencies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    symbol VARCHAR(20) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    type ENUM('crypto', 'fiat') DEFAULT 'crypto',
    icon_url TEXT,
    network VARCHAR(100),
    is_enabled TINYINT(1) DEFAULT 1,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
