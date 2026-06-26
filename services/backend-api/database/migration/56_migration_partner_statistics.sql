-- 56_migration_partner_statistics.sql
-- Defines the game_types and partner_statistics tables to support administrative reporting.

CREATE TABLE IF NOT EXISTS game_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(50) NOT NULL UNIQUE,
    name_ko VARCHAR(100) NOT NULL,
    display_order INT DEFAULT 0
);

-- Seed initial game types
INSERT INTO game_types (code, name_ko, display_order) VALUES
('casino', '카지노', 1),
('slot', '슬롯', 2),
('board', '보드게임', 3),
('mini', '미니게임', 4),
('sports', '스포츠', 5)
ON DUPLICATE KEY UPDATE name_ko = VALUES(name_ko), display_order = VALUES(display_order);

CREATE TABLE IF NOT EXISTS partner_statistics (
    id INT AUTO_INCREMENT PRIMARY KEY,
    partner_id INT NOT NULL,
    stat_date DATE NOT NULL,
    game_type_id INT DEFAULT NULL,
    site_balance DECIMAL(20, 8) DEFAULT 0,
    casino_balance DECIMAL(20, 8) DEFAULT 0,
    holdem_balance DECIMAL(20, 8) DEFAULT 0,
    mini_balance DECIMAL(20, 8) DEFAULT 0,
    total_points DECIMAL(20, 8) DEFAULT 0,
    user_deposit DECIMAL(20, 8) DEFAULT 0,
    user_withdrawal DECIMAL(20, 8) DEFAULT 0,
    user_profit DECIMAL(20, 8) DEFAULT 0,
    partner_deposit DECIMAL(20, 8) DEFAULT 0,
    partner_deposit_received DECIMAL(20, 8) DEFAULT 0,
    partner_withdrawal DECIMAL(20, 8) DEFAULT 0,
    partner_withdrawal_received DECIMAL(20, 8) DEFAULT 0,
    partner_profit DECIMAL(20, 8) DEFAULT 0,
    admin_deposit DECIMAL(20, 8) DEFAULT 0,
    admin_withdrawal DECIMAL(20, 8) DEFAULT 0,
    total_bet_amount DECIMAL(20, 8) DEFAULT 0,
    invalid_bet_amount DECIMAL(20, 8) DEFAULT 0,
    public_bet_amount DECIMAL(20, 8) DEFAULT 0,
    total_win_amount DECIMAL(20, 8) DEFAULT 0,
    betting_profit DECIMAL(20, 8) DEFAULT 0,
    rolling DECIMAL(20, 8) DEFAULT 0,
    member_comp DECIMAL(20, 8) DEFAULT 0,
    first_deposit_bonus DECIMAL(20, 8) DEFAULT 0,
    regular_deposit_bonus DECIMAL(20, 8) DEFAULT 0,
    final_profit DECIMAL(20, 8) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY (partner_id, stat_date, game_type_id),
    FOREIGN KEY (partner_id) REFERENCES users(id),
    FOREIGN KEY (game_type_id) REFERENCES game_types(id)
);

-- Seed some sample data for a partner (assuming user ID 1 is an admin/partner or we can use another ID)
-- This is just for demonstration if needed, but normally populated by a cron job or real-time triggers.
