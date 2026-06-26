-- Seed Sports
INSERT IGNORE INTO sports (slug, name, order_index) VALUES 
('soccer', 'Soccer', 1),
('basketball', 'Basketball', 2),
('tennis', 'Tennis', 3),
('counter-strike', 'Counter-Strike', 4),
('dota-2', 'Dota 2', 5),
('league-of-legends', 'League of Legends', 6),
('baseball', 'Baseball', 7),
('cricket', 'Cricket', 8),
('volleyball', 'Volleyball', 9),
('horseracing', 'Horseracing', 10),
('ice-hockey', 'Ice Hockey', 11),
('sumo', 'Sumo', 12),
('boxing', 'Boxing', 13),
('american-football', 'American Football', 14),
('table-tennis', 'Table Tennis', 15),
('nba2k', 'NBA 2K', 16),
('chess', 'Chess', 17),
('formula1', 'Formula 1', 18),
('badminton', 'Badminton', 19),
('handball', 'Handball', 20),
('beach-volleyball', 'Beach Volleyball', 21),
('aussierules', 'Aussie Rules', 22),
('rugby', 'Rugby', 23),
('waterpolo', 'Waterpolo', 24);

-- Seed Leagues
INSERT IGNORE INTO leagues (sport_id, slug, name, region, is_popular) VALUES 
((SELECT id FROM sports WHERE slug='soccer'), 'serie-a', 'Serie A', 'Italy', TRUE),
((SELECT id FROM sports WHERE slug='soccer'), 'premier-league', 'Premier League', 'England', TRUE),
((SELECT id FROM sports WHERE slug='basketball'), 'nba', 'USA NBA', 'USA', TRUE),
((SELECT id FROM sports WHERE slug='tennis'), 'atp-melbourne', 'ATP Melbourne', 'World', TRUE),
((SELECT id FROM sports WHERE slug='soccer'), 'fa-cup', 'England FA Cup', 'England', TRUE),
((SELECT id FROM sports WHERE slug='soccer'), 'international-champions', 'International Champions', 'World', TRUE);

-- Seed Teams
INSERT IGNORE INTO teams (sport_id, name, logo) VALUES 
((SELECT id FROM sports WHERE slug='soccer'), 'Como 1907', 'https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/2704.png'),
((SELECT id FROM sports WHERE slug='soccer'), 'AC Milan', 'https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/1643.png'),
((SELECT id FROM sports WHERE slug='soccer'), 'Arsenal FC', 'https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/42.png'),
((SELECT id FROM sports WHERE slug='soccer'), 'Liverpool FC', 'https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/44.png'),
((SELECT id FROM sports WHERE slug='basketball'), 'Lakers', 'https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/3421.png'),
((SELECT id FROM sports WHERE slug='basketball'), 'Warriors', 'https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/3432.png'),
((SELECT id FROM sports WHERE slug='tennis'), 'Novak Djokovic', 'https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/14882.png'),
((SELECT id FROM sports WHERE slug='tennis'), 'Rafael Nadal', 'https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/14885.png'),
((SELECT id FROM sports WHERE slug='soccer'), 'Manchester City', 'https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/17.png'),
((SELECT id FROM sports WHERE slug='soccer'), 'Man. United', 'https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/35.png'),
((SELECT id FROM sports WHERE slug='soccer'), 'Tottenham Hotspur', 'https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/33.png'),
((SELECT id FROM sports WHERE slug='basketball'), 'Atlanta Hawks', 'https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/3411.png'),
((SELECT id FROM sports WHERE slug='basketball'), 'Milwaukee Bucks', 'https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/3424.png'),
((SELECT id FROM sports WHERE slug='basketball'), 'Cleveland Cavaliers', 'https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/3415.png'),
((SELECT id FROM sports WHERE slug='basketball'), 'Boston Celtics', 'https://d1bvoel1nv172p.cloudfront.net/competitors/images/normal/medium/3412.png');

-- Seed Match Events (Live & Popular)
INSERT INTO match_events (league_id, home_team_id, away_team_id, start_time, status, is_live, is_popular, home_score, away_score, period_info, slug) VALUES 
((SELECT id FROM leagues WHERE slug='serie-a'), (SELECT id FROM teams WHERE name='Como 1907'), (SELECT id FROM teams WHERE name='AC Milan'), NOW(), 'upcoming', FALSE, TRUE, 1, 0, 'Tomorrow, 03:45', 'como-1907-ac-milan'),
((SELECT id FROM leagues WHERE slug='premier-league'), (SELECT id FROM teams WHERE name='Arsenal FC'), (SELECT id FROM teams WHERE name='Liverpool FC'), NOW(), 'upcoming', FALSE, TRUE, 0, 0, '19 Jan, 00:30', 'arsenal-liverpool'),
((SELECT id FROM leagues WHERE slug='nba'), (SELECT id FROM teams WHERE name='Lakers'), (SELECT id FROM teams WHERE name='Warriors'), NOW(), 'live', TRUE, TRUE, 85, 82, 'Today, 10:00', 'lakers-warriors'),
((SELECT id FROM leagues WHERE slug='atp-melbourne'), (SELECT id FROM teams WHERE name='Novak Djokovic'), (SELECT id FROM teams WHERE name='Rafael Nadal'), NOW(), 'live', TRUE, TRUE, 2, 1, 'Live 3rd Set', 'djokovic-nadal'),
((SELECT id FROM leagues WHERE slug='fa-cup'), (SELECT id FROM teams WHERE name='Manchester City'), (SELECT id FROM teams WHERE name='Man. United'), NOW(), 'live', TRUE, TRUE, 3, 3, '74'' 2nd half', 'mancity-manutd'),
((SELECT id FROM leagues WHERE slug='international-champions'), (SELECT id FROM teams WHERE name='Tottenham Hotspur'), (SELECT id FROM teams WHERE name='Liverpool FC'), NOW(), 'live', TRUE, TRUE, 0, 0, '62'' 2nd half', 'tottenham-liverpool'),
((SELECT id FROM leagues WHERE slug='fa-cup'), (SELECT id FROM teams WHERE name='Arsenal FC'), (SELECT id FROM teams WHERE name='Manchester City'), NOW(), 'upcoming', FALSE, TRUE, 0, 0, 'Today, 16:40', 'arsenal-mancity'),
((SELECT id FROM leagues WHERE slug='nba'), (SELECT id FROM teams WHERE name='Atlanta Hawks'), (SELECT id FROM teams WHERE name='Milwaukee Bucks'), NOW(), 'upcoming', FALSE, TRUE, 0, 0, 'Tomorrow, 02:00', 'hawks-bucks'),
((SELECT id FROM leagues WHERE slug='nba'), (SELECT id FROM teams WHERE name='Cleveland Cavaliers'), (SELECT id FROM teams WHERE name='Boston Celtics'), NOW(), 'upcoming', FALSE, TRUE, 0, 0, 'Tomorrow, 02:00', 'cavs-celtics')
ON DUPLICATE KEY UPDATE home_score=VALUES(home_score), away_score=VALUES(away_score), is_live=VALUES(is_live), status=VALUES(status), period_info=VALUES(period_info);

-- Seed Match Odds
INSERT INTO match_odds (match_id, outcome_name, odds_value) VALUES 
((SELECT id FROM match_events WHERE slug='como-1907-ac-milan'), '1', 2.92), ((SELECT id FROM match_events WHERE slug='como-1907-ac-milan'), 'draw', 3.15), ((SELECT id FROM match_events WHERE slug='como-1907-ac-milan'), '2', 2.48),
((SELECT id FROM match_events WHERE slug='arsenal-liverpool'), '1', 2.10), ((SELECT id FROM match_events WHERE slug='arsenal-liverpool'), 'draw', 3.40), ((SELECT id FROM match_events WHERE slug='arsenal-liverpool'), '2', 3.20),
((SELECT id FROM match_events WHERE slug='lakers-warriors'), '1', 1.85), ((SELECT id FROM match_events WHERE slug='lakers-warriors'), '2', 1.95),
((SELECT id FROM match_events WHERE slug='djokovic-nadal'), '1', 1.40), ((SELECT id FROM match_events WHERE slug='djokovic-nadal'), '2', 2.80),
((SELECT id FROM match_events WHERE slug='mancity-manutd'), '1', 3.60), ((SELECT id FROM match_events WHERE slug='mancity-manutd'), 'draw', 1.85), ((SELECT id FROM match_events WHERE slug='mancity-manutd'), '2', 3.50),
((SELECT id FROM match_events WHERE slug='tottenham-liverpool'), '1', 5.30), ((SELECT id FROM match_events WHERE slug='tottenham-liverpool'), 'draw', 1.90), ((SELECT id FROM match_events WHERE slug='tottenham-liverpool'), '2', 2.55),
((SELECT id FROM match_events WHERE slug='arsenal-mancity'), '1', 3.70), ((SELECT id FROM match_events WHERE slug='arsenal-mancity'), 'draw', 3.15), ((SELECT id FROM match_events WHERE slug='arsenal-mancity'), '2', 1.95),
((SELECT id FROM match_events WHERE slug='hawks-bucks'), '1', 1.68), ((SELECT id FROM match_events WHERE slug='hawks-bucks'), '2', 2.14),
((SELECT id FROM match_events WHERE slug='cavs-celtics'), '1', 1.85), ((SELECT id FROM match_events WHERE slug='cavs-celtics'), '2', 1.95)
ON DUPLICATE KEY UPDATE odds_value = VALUES(odds_value);
