-- Migration: Create boards table for CMS
CREATE TABLE IF NOT EXISTS boards (
  id INT AUTO_INCREMENT PRIMARY KEY,
  board_type VARCHAR(50) NOT NULL,
  user_id INT NOT NULL,
  subject VARCHAR(255) NOT NULL,
  content TEXT,
  title_color VARCHAR(10) DEFAULT '#000000',
  title_weight VARCHAR(10) DEFAULT '',
  is_pinned CHAR(1) DEFAULT 'N',
  display_order INT DEFAULT 0,
  is_popup CHAR(1) DEFAULT 'N',
  is_disabled CHAR(1) DEFAULT 'N',
  view_date DATETIME DEFAULT NULL,
  view_count INT DEFAULT 0,
  request_type VARCHAR(50) DEFAULT '',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_board_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
