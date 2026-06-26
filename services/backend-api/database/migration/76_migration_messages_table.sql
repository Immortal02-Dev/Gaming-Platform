-- Drop existing if any to ensure clean creation with correct FKs
DROP TABLE IF EXISTS messages;

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sender_id INT NULL,
  sender_type ENUM('admin', 'user') DEFAULT 'admin',
  receiver_id INT NOT NULL,
  subject VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  is_read TINYINT(1) DEFAULT 0,
  read_at TIMESTAMP NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE
);
