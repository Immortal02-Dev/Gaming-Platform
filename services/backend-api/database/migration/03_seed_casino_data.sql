-- Seed: Providers
INSERT IGNORE INTO providers (slug, name, logo, game_count) VALUES
('bc-originals',    'BC Originals',    'https://imgxcut.com/provider/bc.png',        12),
('pragmatic-play',  'Pragmatic Play',  'https://imgxcut.com/provider/pragmatic.png', 200),
('evolution',       'Evolution',       'https://imgxcut.com/provider/evolution.png',  150),
('netent',          'NetEnt',          'https://imgxcut.com/provider/netent.png',     120),
('hacksaw-gaming',  'Hacksaw Gaming',  'https://imgxcut.com/provider/hacksaw.png',   80),
('nolimit-city',    'Nolimit City',    'https://imgxcut.com/provider/nolimit.png',   60),
('pg-soft',         'PG Soft',         'https://imgxcut.com/provider/pgsoft.png',    100),
('croco-gaming',    'Croco Gaming',    'https://imgxcut.com/provider/croco.png',     30);

-- Seed: Games (BC Originals)
INSERT IGNORE INTO games (slug, title, image, category, provider_id, user_count, is_new, is_featured, is_hot) VALUES
('crash',  'Crash', 'https://imgxcut.com/game/image/a016f83c71.png?_v=4,dpr=1,width=200', 'original', 1, 5600, FALSE, TRUE,  TRUE),
('limbo',  'Limbo', 'https://imgxcut.com/game/image/a09aa93f72.png?_v=4,dpr=1,width=200', 'original', 1, 880,  FALSE, TRUE,  FALSE),
('hash-dice', 'Hash Dice', 'https://imgxcut.com/game/image/329847a6f1.png?_v=4,dpr=1,width=200', 'original', 1, 120, TRUE, FALSE, FALSE),
('plinko', 'Plinko', 'https://imgxcut.com/game/image/10d9a6377d.png?_v=4,width=200', 'original', 1, 4320, FALSE, TRUE, TRUE),
('mines',  'Mines',  'https://imgxcut.com/game/image/10d9a6377d.png?_v=4,width=200', 'original', 1, 945,  TRUE,  FALSE, TRUE),
('wheel',  'Wheel',  'https://imgxcut.com/game/image/10d9a6377d.png?_v=4,width=200', 'original', 1, 125,  FALSE, FALSE, FALSE),
('cave',   'Cave',   'https://imgxcut.com/game/image/10d9a6377d.png?_v=4,width=200', 'original', 1, 312,  TRUE,  FALSE, FALSE);

-- Seed: Games (Slots)
INSERT IGNORE INTO games (slug, title, image, category, provider_id, user_count, is_new, is_featured, is_hot) VALUES
('gates-of-olympus',   'Gates of Olympus',       'https://imgxcut.com/game/image/560a6e3d9e.png?_v=4,dpr=1,width=200', 'slots', 2, 2105, FALSE, TRUE,  TRUE),
('sweet-bonanza',      'Sweet Bonanza',           'https://imgxcut.com/game/image/560a6e3d9e.png?_v=4,dpr=1,width=200', 'slots', 2, 670,  FALSE, FALSE, FALSE),
('sugar-rush-1000',    'Sugar Rush 1000',         'https://imgxcut.com/game/image/560a6e3d9e.png?_v=4,dpr=1,width=200', 'slots', 2, 312,  TRUE,  FALSE, FALSE),
('starlight-princess', 'Starlight Princess',      'https://imgxcut.com/game/image/d77f9da9de.png?_v=4,dpr=1,width=200', 'slots', 2, 418,  FALSE, FALSE, FALSE),
('bear-smash-15000x',  'Bear Smash: 15000X Boost','https://imgxcut.com/game/image/560a6e3d9e.png?_v=4,dpr=1,width=200', 'slots', 2, 52,   TRUE,  FALSE, FALSE),
('arcane-portals',     'Arcane Portals',           'https://imgxcut.com/game/image/fedd8dd28a.png?_v=4,dpr=1,width=200', 'slots', 5, 1240, FALSE, TRUE,  TRUE),
('wukong',             'Wukong',                   'https://imgxcut.com/game/image/d77f9da9de.png?_v=4,dpr=1,width=200', 'slots', 7, 24,   FALSE, FALSE, FALSE),
('ne-zha',             'Ne Zha',                   'https://imgxcut.com/game/image/d77f9da9de.png?_v=4,dpr=1,width=200', 'slots', 7, 26,   TRUE,  FALSE, FALSE),
('super-waldo',        'Super Waldo',              'https://imgxcut.com/game/image/d77f9da9de.png?_v=4,dpr=1,width=200', 'slots', 6, 49,   FALSE, FALSE, FALSE),
('deadliest-sea',      'Deadliest Sea',            'https://imgxcut.com/game/image/d77f9da9de.png?_v=4,dpr=1,width=200', 'slots', 6, 76,   FALSE, FALSE, FALSE),
('rhino-robbery',      'Rhino Robbery',            'https://imgxcut.com/game/image/560a6e3d9e.png?_v=4,dpr=1,width=200', 'slots', 5, 30,   TRUE,  FALSE, FALSE);

-- Seed: Games (Live – Baccarat & Roulette)
INSERT IGNORE INTO games (slug, title, image, category, provider_id, user_count, is_new, is_featured, is_hot) VALUES
('speed-baccarat-1', 'Speed Baccarat 1', 'https://imgxcut.com/game/image/69e527b573.png?_v=4,dpr=1,width=200', 'baccarat', 3, 88,  FALSE, TRUE, TRUE),
('speed-baccarat-2', 'Speed Baccarat 2', 'https://imgxcut.com/game/image/69e527b573.png?_v=4,dpr=1,width=200', 'baccarat', 3, 45,  FALSE, FALSE, FALSE),
('roulette-1',       'Roulette 1',       'https://imgxcut.com/game/image/ad1dfce45a.png',                       'roulette', 3, 99,  FALSE, TRUE, TRUE),
('roulette-2',       'Roulette 2',       'https://imgxcut.com/game/image/ad1dfce45a.png',                       'roulette', 3, 154, FALSE, FALSE, FALSE);

-- Seed: Games (Croco Gaming)
INSERT IGNORE INTO games (slug, title, image, category, provider_id, user_count, is_new, is_featured, is_hot) VALUES
('torture-block',    'Torture Block',    'https://imgxcut.com/game/image/10d9a6377d.png?_v=4,width=200', 'burst-games',    8, 40, TRUE,  FALSE, FALSE),
('sugar-fiesta-1000','Sugar Fiesta 1000','https://imgxcut.com/game/image/10d9a6377d.png?_v=4,width=200', 'feature-buy-in', 8, 55, TRUE,  FALSE, FALSE),
('bubble-shooter',   'Bubble Shooter',   'https://imgxcut.com/game/image/10d9a6377d.png?_v=4,width=200', 'game-shows',     8, 30, FALSE, FALSE, FALSE);
