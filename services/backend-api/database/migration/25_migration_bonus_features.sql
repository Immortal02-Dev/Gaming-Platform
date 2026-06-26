CREATE TABLE IF NOT EXISTS promo_codes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) UNIQUE NOT NULL,
    reward_type VARCHAR(50) NOT NULL,
    reward_amount DECIMAL(20, 8) NOT NULL,
    max_uses INT DEFAULT 1,
    current_uses INT DEFAULT 0,
    expires_at DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS promo_code_redemptions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    promo_code_id INT,
    redeemed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (promo_code_id) REFERENCES promo_codes(id)
);

CREATE TABLE IF NOT EXISTS user_rakeback (
    user_id INT PRIMARY KEY,
    locked_bcd DECIMAL(20, 8) DEFAULT 0,
    unlock_rate DECIMAL(5, 2) DEFAULT 0,
    ready_to_claim DECIMAL(20, 8) DEFAULT 0,
    next_claim_time DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS user_tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    task_name VARCHAR(255) NOT NULL,
    status ENUM('pending', 'completed', 'claimed') DEFAULT 'pending',
    reward_amount DECIMAL(20, 8) DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS user_spins (
    user_id INT PRIMARY KEY,
    daily_spins_available INT DEFAULT 0,
    last_spin_time DATETIME,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS user_vault_stats (
    user_id INT PRIMARY KEY,
    balance DECIMAL(20, 8) DEFAULT 0,
    total_return DECIMAL(20, 8) DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
