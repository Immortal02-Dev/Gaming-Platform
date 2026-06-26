-- 55_migration_system_logs.sql
-- Infrastructure for automated system logging and improved log querying.

CREATE TABLE IF NOT EXISTS system_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    level ENUM('info', 'warning', 'error', 'critical') DEFAULT 'info',
    message TEXT NOT NULL,
    context JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Improve performance for admin log queries
CREATE INDEX idx_user_login_history_user_id ON user_login_history(user_id);
CREATE INDEX idx_user_login_history_created_at ON user_login_history(created_at);
CREATE INDEX idx_admin_audit_logs_admin_id ON admin_audit_logs(admin_id);
CREATE INDEX idx_admin_audit_logs_created_at ON admin_audit_logs(created_at);

-- Ensure login_attempts table exists with proper structure (if not already there)
CREATE TABLE IF NOT EXISTS login_attempts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ip_address VARCHAR(45) NOT NULL,
    username VARCHAR(100) NOT NULL,
    attempts INT DEFAULT 1,
    lockout_until TIMESTAMP NULL,
    last_attempt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_login_attempts_ip (ip_address),
    INDEX idx_login_attempts_username (username)
);

-- Seed some initial system logs for demonstration
INSERT INTO system_logs (level, message, context) VALUES
('info', 'System Audit System initialized.', '{"version": "1.0.0"}'),
('info', 'Payment Webhook integration verified.', '{"status": "active"}');
