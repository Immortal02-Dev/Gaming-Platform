-- 45_migration_vip_system_update.sql
-- Create VIP levels table and update users to support VIP tiers.

CREATE TABLE IF NOT EXISTS vip_levels (
    id INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    min_wager DECIMAL(20, 8) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed initial VIP levels
INSERT INTO vip_levels (id, name, min_wager) VALUES
(0, 'None', 0),
(1, 'Bronze', 1000),
(2, 'Silver', 5000),
(3, 'Gold', 25000),
(4, 'Platinum', 100000),
(5, 'Diamond', 500000)
ON DUPLICATE KEY UPDATE name = VALUES(name), min_wager = VALUES(min_wager);

-- Update users table
ALTER TABLE users ADD COLUMN vip_level_id INT DEFAULT 0;
ALTER TABLE users ADD COLUMN total_wagered DECIMAL(20, 8) DEFAULT 0;

-- Optional: Add foreign key if we're sure about the relationship
-- ALTER TABLE users ADD CONSTRAINT fk_vip_level FOREIGN KEY (vip_level_id) REFERENCES vip_levels(id);
