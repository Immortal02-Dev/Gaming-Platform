-- Create rules table
CREATE TABLE IF NOT EXISTS rules (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category VARCHAR(100) NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  is_active TINYINT(1) DEFAULT 1,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert some default rules
INSERT IGNORE INTO rules (category, title, content, display_order) VALUES
('General', 'Service Terms', '<p>Welcome to BC Game. By using our service, you agree to...</p>', 1),
('Sports', 'Betting Rules', '<p>Sports betting rules are as follows...</p>', 2),
('Casino', 'Game Rules', '<p>Casino games are subject to...</p>', 3);
