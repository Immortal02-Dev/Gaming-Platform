-- Seed admin and super_admin users
-- Passwords are bcrypt-hashed:
--   admin      → 123456
--   superadmin → 123456

INSERT IGNORE INTO users (email_or_phone, username, password, role)
VALUES
  ('admin@bcgame.com',      'admin',      '$2b$10$TebZ4y87Z9kO3gJpU2j9iOjO6Yk01wQ3K8Y1sO8A3z8m1W4x5M9P.', 'admin'),
  ('superadmin@bcgame.com', 'superadmin', '$2b$10$TebZ4y87Z9kO3gJpU2j9iOjO6Yk01wQ3K8Y1sO8A3z8m1W4x5M9P.', 'super_admin');
