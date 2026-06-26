CREATE TABLE IF NOT EXISTS user_edit_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    change_item VARCHAR(100) NOT NULL,
    change_column VARCHAR(100),
    before_value TEXT,
    after_value TEXT,
    ip_address VARCHAR(45),
    processor_id INT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (processor_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Sample data
INSERT INTO user_edit_logs (user_id, change_item, change_column, before_value, after_value, ip_address, processor_id)
VALUES 
(1, '닉네임 변경', 'nickname', 'OldNick', 'NewNick', '127.0.0.1', 1),
(1, '상태 변경', 'status', 'active', 'suspended', '127.0.0.1', 1);
