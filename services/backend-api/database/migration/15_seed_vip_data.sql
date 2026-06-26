-- 15_seed_vip_data.sql
-- Seed initial VIP data based on the frontend's hardcoded values in VipPage.tsx.

INSERT IGNORE INTO vip_benefits (title, description, image_url, display_order)
VALUES 
('Instant Lossback', 'Earn rewards back instantly as you play', 'https://bc.game/modules/bonus2/assets/loseback-DluD27UI.png', 1),
('Reload Bonuses', 'Receive rewards every day — the more you play, the higher you get.', 'https://bc.game/modules/bonus2/assets/reload-CoCN1P9X.png', 2),
('Gameplay Bonuses', 'Play across different game types to unlock richer rewards', 'https://bc.game/modules/bonus2/assets/bonus-B3AOP16q.png', 3),
('Top Player Bonuses', 'Play at the top to unlock exclusive rewards.', 'https://bc.game/modules/bonus2/assets/top-Bj1Butrk.png', 4),
('Fee-Free D & W', 'All deposits and withdrawals are fee-free, fiat and crypto.', 'https://bc.game/modules/bonus2/assets/fee-Bnd00i3B.png', 5),
('IRL VIP Events & Rewards', 'Exclusive real-world VIP experiences', 'https://bc.game/modules/bonus2/assets/rewards-BUeZTSWJ.png', 6),
('Dedicated VIP Host', 'Personalized support whenever you need it', 'https://bc.game/modules/bonus2/assets/host-CGvTeHkv.png', 7);

INSERT IGNORE INTO vip_faqs (category, question, answer, display_order)
VALUES 
('General', 'How do I become a VIP?', 'Consistent and responsible gameplay helps you stand out as a valued player. No barriers — every player has the opportunity to qualify.', 1),
('General', 'What is the VIP Transfer?', 'We offer a VIP transfer service for high-tier members from other platforms. Contact our support for details.', 2),
('General', 'What makes the BC.GAME VIP Club different from others?', 'We offer a personalized elite experience with instant withdrawals and dedicated hosts.', 3);
