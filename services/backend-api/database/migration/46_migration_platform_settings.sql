-- 46_migration_platform_settings.sql
-- Store platform-wide configurations like branding, contact info, etc.

CREATE TABLE IF NOT EXISTS platform_settings (
    setting_key VARCHAR(50) PRIMARY KEY,
    setting_value TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


-- Seed initial branding settings
INSERT INTO platform_settings (setting_key, setting_value) VALUES
('site_name', 'BC.Admin'),
('site_logo_type', 'icon'), -- 'icon' or 'image'
('primary_color', '#6366f1'), -- Indigo-500
('secondary_color', '#8b5cf6'), -- Violet-600
('favicon_url', '/favicon.ico')
ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value);
