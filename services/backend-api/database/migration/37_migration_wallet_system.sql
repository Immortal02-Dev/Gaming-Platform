-- Create user_balances table
CREATE TABLE IF NOT EXISTS user_balances (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    currency VARCHAR(10) NOT NULL,
    amount DECIMAL(20, 8) DEFAULT 0,
    locked_amount DECIMAL(20, 8) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY user_currency (user_id, currency),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create wallet_transactions table
CREATE TABLE IF NOT EXISTS wallet_transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'deposit', 'withdraw', 'transfer', 'swap', 'bet', 'bonus'
    currency VARCHAR(10) NOT NULL,
    amount DECIMAL(20, 8) NOT NULL,
    balance_after DECIMAL(20, 8) NOT NULL,
    status ENUM('pending', 'completed', 'failed', 'canceled') DEFAULT 'completed',
    tx_hash VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create crypto_deposit_addresses table
CREATE TABLE IF NOT EXISTS crypto_deposit_addresses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    currency VARCHAR(10) NOT NULL,
    network VARCHAR(50) NOT NULL,
    address VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY user_currency_network (user_id, currency, network),
    FOREIGN KEY (user_id) REFERENCES users(id)
);
