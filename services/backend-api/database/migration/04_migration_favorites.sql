-- User Favorites table
CREATE TABLE IF NOT EXISTS user_favorites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    game_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY user_game (user_id, game_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE
);

-- Seed some favorites for testing (user_id 1 is usually the first registered user)
-- Note: This assumes games with IDs 1, 4, 17, 18, 24, 28, 29 exist from seed 03.
INSERT IGNORE INTO user_favorites (user_id, game_id) VALUES
(1, 1),
(1, 4),
(1, 17),
(1, 18),
(1, 24),
(1, 28),
(1, 29);
