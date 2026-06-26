-- New migration to add tracking and status fields to users table
ALTER TABLE users
ADD COLUMN last_login DATETIME DEFAULT NULL,
ADD COLUMN last_ip_address VARCHAR(45) DEFAULT NULL,
ADD COLUMN status ENUM('ACTIVE', 'BANNED', 'SUSPENDED') DEFAULT 'ACTIVE',
ADD COLUMN admin_notes TEXT DEFAULT NULL;
