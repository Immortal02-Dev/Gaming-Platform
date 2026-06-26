-- Create guides table
CREATE TABLE IF NOT EXISTS guides (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category VARCHAR(100) NOT NULL,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  is_active TINYINT(1) DEFAULT 1,
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert some default guides
INSERT IGNORE INTO guides (category, title, content, display_order) VALUES
('Beginner', 'How to play Casino', '<p>To play casino games, first deposit funds...</p>', 1),
('Beginner', 'How to play Sports', '<p>Choose your favorite sport and place a bet...</p>', 2),
('Advanced', 'VIP Benefits', '<p>As a VIP member, you get access to...</p>', 3);
