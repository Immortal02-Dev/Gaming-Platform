-- 10_migration_promotions.sql
-- Create a promotions table to store all promotional events.

CREATE TABLE IF NOT EXISTS promotions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url VARCHAR(255) NOT NULL,
  category ENUM('all', 'casino', 'sports', 'bc-exclusive') DEFAULT 'all',
  status ENUM('active', 'archived') DEFAULT 'active',
  ends_at DATETIME NOT NULL,
  is_exclusive BOOLEAN DEFAULT FALSE,
  type ENUM('general', 'daily_contest', 'weekly_raffle') DEFAULT 'general',
  config JSON DEFAULT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
