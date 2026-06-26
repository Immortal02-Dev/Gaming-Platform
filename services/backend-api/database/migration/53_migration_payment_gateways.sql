-- Create Payment Gateways table
CREATE TABLE IF NOT EXISTS platform_payment_gateways (
    id INT AUTO_INCREMENT PRIMARY KEY,
    provider_name VARCHAR(50) NOT NULL, -- 'GCash', 'PayMaya', 'Crypto', 'Bank'
    provider_type VARCHAR(20) NOT NULL, -- 'fiat', 'crypto'
    api_key VARCHAR(255),
    api_secret VARCHAR(255),
    is_sandbox BOOLEAN DEFAULT TRUE,
    is_active BOOLEAN DEFAULT FALSE,
    auto_process BOOLEAN DEFAULT FALSE, -- whether to automatically approve pending txs
    supported_currencies JSON,
    min_limit DECIMAL(20,8),
    max_limit DECIMAL(20,8),
    fee_percentage DECIMAL(5,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY (provider_name)
);

-- Insert Default Gateway Configs
INSERT IGNORE INTO platform_payment_gateways (provider_name, provider_type, is_active, auto_process, supported_currencies) VALUES
('GCash', 'fiat', FALSE, FALSE, '["PHP"]'),
('PayMaya', 'fiat', FALSE, FALSE, '["PHP"]'),
('BankTransfer', 'fiat', FALSE, FALSE, '["PHP", "USD"]'),
('NowPayments', 'crypto', FALSE, TRUE, '["BTC", "ETH", "USDT", "LTC"]');


-- Create Webhook Logs table
CREATE TABLE IF NOT EXISTS payment_webhook_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    provider_name VARCHAR(50) NOT NULL,
    event_type VARCHAR(50),      -- 'deposit', 'withdrawal', 'refund'
    transaction_id VARCHAR(100), -- external tx id
    status VARCHAR(50),          -- 'success', 'failed', 'pending'
    raw_payload JSON,            -- Complete Webhook Data
    processed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
