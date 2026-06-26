-- Sports categories (Soccer, Basketball, etc.)
CREATE TABLE IF NOT EXISTS sports (
    id INT AUTO_INCREMENT PRIMARY KEY,
    slug VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(150) NOT NULL,
    icon_svg TEXT,
    order_index INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Leagues/Competitions (Serie A, Premier League, NBA, etc.)
CREATE TABLE IF NOT EXISTS leagues (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sport_id INT NOT NULL,
    slug VARCHAR(200) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    region VARCHAR(100),
    logo VARCHAR(500),
    is_popular BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sport_id) REFERENCES sports(id) ON DELETE CASCADE
);

-- Teams/Competitors
CREATE TABLE IF NOT EXISTS teams (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sport_id INT NOT NULL,
    name VARCHAR(255) NOT NULL UNIQUE,
    logo VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sport_id) REFERENCES sports(id) ON DELETE CASCADE
);

-- Match Events
CREATE TABLE IF NOT EXISTS match_events (
    id INT AUTO_INCREMENT PRIMARY KEY,
    league_id INT NOT NULL,
    home_team_id INT NOT NULL,
    away_team_id INT NOT NULL,
    start_time DATETIME NOT NULL,
    status ENUM('upcoming', 'live', 'finished', 'cancelled') DEFAULT 'upcoming',
    is_live BOOLEAN DEFAULT FALSE,
    is_popular BOOLEAN DEFAULT FALSE,
    home_score INT DEFAULT 0,
    away_score INT DEFAULT 0,
    period_info VARCHAR(100), -- e.g., "75'", "Q4 02:15", "3rd Set"
    slug VARCHAR(500) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (league_id) REFERENCES leagues(id) ON DELETE CASCADE,
    FOREIGN KEY (home_team_id) REFERENCES teams(id) ON DELETE CASCADE,
    FOREIGN KEY (away_team_id) REFERENCES teams(id) ON DELETE CASCADE
);

-- Match Odds (simplified for now to match current UI)
CREATE TABLE IF NOT EXISTS match_odds (
    id INT AUTO_INCREMENT PRIMARY KEY,
    match_id INT NOT NULL,
    market_name VARCHAR(100) DEFAULT '1x2', -- e.g., '1x2', 'Winner', 'Handicap'
    outcome_name VARCHAR(100) NOT NULL,    -- e.g., '1', 'draw', '2'
    odds_value DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (match_id) REFERENCES match_events(id) ON DELETE CASCADE,
    UNIQUE KEY unique_match_market_outcome (match_id, market_name, outcome_name)
);
