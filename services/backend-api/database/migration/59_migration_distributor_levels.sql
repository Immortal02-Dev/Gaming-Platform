-- 59_migration_distributor_levels.sql
-- Adds distributor_levels table for managing partner hierarchy levels

CREATE TABLE IF NOT EXISTS distributor_levels (
    idx INT AUTO_INCREMENT PRIMARY KEY,
    step INT NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    short_name VARCHAR(50) NOT NULL,
    color VARCHAR(20) DEFAULT '#000000',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uk_step (step)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert default levels if the table is empty
INSERT IGNORE INTO distributor_levels (step, full_name, short_name, color) VALUES
(1, '부본사', '부본', '#45818e'),
(2, '총판', '총판', '#6aa84f'),
(3, '매장', '매장', '#f1c232');
