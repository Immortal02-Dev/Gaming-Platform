-- Seed initial lottery data based on the frontend's hardcoded values.

INSERT IGNORE INTO lotteries (slug, title, draw_time, prize_pool, icon_src, icon_offset_y, is_exclusive, is_popular)
VALUES 
('poland-keno', 'Poland Keno 20/70', '2026-03-15 12:00:00', '₩2,180,877', 'https://bc.game/modules/lottery2/assets/countries-BwR1Q6Zz.png', -2600, FALSE, FALSE),
('slovakia-eklub-keno', 'Slovakia EKlub Keno 20/80', '2026-03-15 12:05:00', '₩14,539,182', 'https://bc.game/modules/lottery2/assets/countries-BwR1Q6Zz.png', -3000, FALSE, FALSE),
('fast-keno', 'FAST KENO 20/80', '2026-03-15 12:10:00', '₩8,723,509', 'https://bc.game/modules/lottery2/assets/countries-BwR1Q6Zz.png', -2000, FALSE, FALSE),
('greece-keno', 'Greece KENO 20/80', '2026-03-15 12:15:00', '₩55,248,892', 'https://bc.game/modules/lottery2/assets/countries-BwR1Q6Zz.png', -1300, FALSE, FALSE),
('bc-lottery', 'BC Lottery', '2026-03-15 15:00:00', '₩145,391K', 'https://bc.game/substation/bc/lottery/lottery/logo.png', 0, TRUE, TRUE),
('spanish-express', 'Spanish Express 20/70', '2026-03-15 16:00:00', '₩2,180,877', 'https://bc.game/modules/lottery2/assets/countries-BwR1Q6Zz.png', -769, FALSE, TRUE),
('gosloto-russia', 'Gosloto Russia 5/50', '2026-03-15 16:30:00', '₩130,852', 'https://bc.game/modules/lottery2/assets/countries-BwR1Q6Zz.png', -673, FALSE, TRUE);
