CREATE TABLE IF NOT EXISTS referral_stats (
    user_id INT PRIMARY KEY,
    total_rewards DECIMAL(20, 8) DEFAULT 0,
    total_friends INT DEFAULT 0,
    referral_code VARCHAR(50),
    referral_link VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS referral_rewards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    friend_name VARCHAR(100),
    amount DECIMAL(20, 8),
    currency VARCHAR(10) DEFAULT 'BCD',
    status VARCHAR(20) DEFAULT 'claimed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
