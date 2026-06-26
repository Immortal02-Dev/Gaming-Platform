CREATE TABLE IF NOT EXISTS user_bonus_stats (
    user_id INT PRIMARY KEY,
    total_claimed DECIMAL(20, 8) DEFAULT 0,
    vip_bonus DECIMAL(20, 8) DEFAULT 0,
    special_bonus DECIMAL(20, 8) DEFAULT 0,
    general_bonus DECIMAL(20, 8) DEFAULT 0,
    locked_bonus DECIMAL(20, 8) DEFAULT 0,
    deposit_bonus_progress DECIMAL(5, 2) DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS swap_rates (
    id INT AUTO_INCREMENT PRIMARY KEY,
    from_coin VARCHAR(10),
    to_coin VARCHAR(10),
    rate DECIMAL(20, 10),
    fee_percentage DECIMAL(5, 2) DEFAULT 1.00
);
