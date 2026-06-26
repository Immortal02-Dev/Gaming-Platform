CREATE TABLE IF NOT EXISTS sponsorships (
    id INT AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(100) UNIQUE NOT NULL,
    partner_name VARCHAR(100),
    title VARCHAR(255),
    logo_url VARCHAR(255),
    banner_url VARCHAR(255),
    description TEXT,
    content_json JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
