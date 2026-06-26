-- Create message_templates table
CREATE TABLE IF NOT EXISTS message_templates (
  id INT AUTO_INCREMENT PRIMARY KEY,
  template_name VARCHAR(100) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  created_by INT UNSIGNED NULL,
  is_active TINYINT(1) DEFAULT 1,
  usage_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES admin_managers(managerIdx) ON DELETE SET NULL
);

-- Insert some default templates
INSERT IGNORE INTO message_templates (template_name, subject, content) VALUES
('Welcome', 'Welcome to BC Game!', '<p>Hello! Welcome to our platform. Enjoy your bonus...</p>'),
('Deposit', 'Deposit Successful', '<p>Your deposit has been successfully processed...</p>'),
('Withdrawal', 'Withdrawal Processed', '<p>Your withdrawal request has been completed...</p>');
