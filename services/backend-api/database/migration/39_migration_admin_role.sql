-- Migration to add admin role to users
ALTER TABLE users ADD COLUMN role ENUM('user', 'admin', 'super_admin') DEFAULT 'user';

-- Set initial admin (optional, for testing)
-- UPDATE users SET role = 'admin' WHERE username = 'admin';
