-- 49_seed_platform_admin_data.sql
-- Seed initial data for Platform Admin features

-- Seed Initial Platform Settings (BC Token & Vault)
INSERT INTO platform_settings (setting_key, setting_value) VALUES
('vault_apr', '25'),
('bc_token_price', '0.00704'),
('bc_token_price_change', '1.15'),
('bc_market_cap', '70.4M'),
('bc_total_supply', '10B'),
('bc_circulating_supply', '2,542,200,432.01'),
('bc_circulating_pct', '25.422'),
('bc_burnt_supply', '257,799,567.98'),
('bc_burnt_pct', '2.578'),
('bc_locked_supply', '7,200,000,000'),
('bc_locked_pct', '72'),
('bc_24h_wager', '$114,516,543.68'),
('bc_24h_online', '175,783'),
('bc_24h_bets', '7,513,413'),
('bc_24h_won', '$113,415,644.95')
ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value);

-- Seed Sample Banners
INSERT INTO banners (title, description, image, href, gradient_color, sort_order, is_active, is_promo) VALUES
('Welcome Bonus', 'Get up to 360% bonus on your first 4 deposits!', 'https://img.freepik.com/free-vector/gradient-crypto-banner-template_23-2149187313.jpg', '/promotions', 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%)', 1, 1, 1),
('Daily Contest', 'Total prize pool of $10,000 every single day!', 'https://img.freepik.com/free-vector/flat-crypto-instagram-stories-collection_23-2149176316.jpg', '/contest', 'linear-gradient(90deg, #f59e0b 0%, #ef4444 100%)', 2, 1, 0),
('VIP Club', 'Join the most exclusive club in the crypto gaming industry.', 'https://img.freepik.com/free-vector/flat-nft-banner-concept_23-2149253457.jpg', '/vip', 'linear-gradient(90deg, #10b981 0%, #3b82f6 100%)', 3, 1, 0);

-- Seed Initial Currencies
INSERT INTO platform_currencies (symbol, name, type, icon_url, network, is_enabled, sort_order) VALUES
('BTC', 'Bitcoin', 'crypto', 'https://cryptologos.cc/logos/bitcoin-btc-logo.png', 'BTC', 1, 1),
('ETH', 'Ethereum', 'crypto', 'https://cryptologos.cc/logos/ethereum-eth-logo.png', 'ERC20', 1, 2),
('USDT', 'Tether', 'crypto', 'https://cryptologos.cc/logos/tether-usdt-logo.png', 'ERC20/TRC20', 1, 3),
('BC', 'BC Token', 'crypto', '/logos/bc-token.png', 'Native', 1, 0),
('USD', 'US Dollar', 'fiat', 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png', 'Banking', 1, 4)
ON DUPLICATE KEY UPDATE name = VALUES(name), type = VALUES(type), is_enabled = VALUES(is_enabled);

-- Seed Sample Swap Rates
INSERT INTO swap_rates (from_currency, to_currency, rate, fee_percent, min_amount, max_amount) VALUES
('USDT', 'BC', 100.0, 1.0, 10, 100000),
('BTC', 'BC', 6500000.0, 1.5, 0.0001, 10),
('ETH', 'BC', 350000.0, 1.5, 0.01, 100)
ON DUPLICATE KEY UPDATE rate = VALUES(rate), fee_percent = VALUES(fee_percent);
