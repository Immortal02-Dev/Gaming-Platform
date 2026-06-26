-- 14_migration_vip.sql
-- Create tables for VIP benefits and FAQs.

CREATE TABLE IF NOT EXISTS vip_benefits (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url VARCHAR(255),
  display_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS vip_faqs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category VARCHAR(100) DEFAULT 'General',
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  display_order INT DEFAULT 0
);
