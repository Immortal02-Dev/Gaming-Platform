-- Seed Data: Trading Markets
INSERT IGNORE INTO trading_markets (symbol, name, icon, price, change_24h, type, payout_multiplier, max_leverage, spread)
VALUES 
('STONKS', 'STONKS', 'https://currency-trade.s3.ap-east-1.amazonaws.com/icons/STONKS.png', 956.06, -16.21, 'crypto', 1.96, 1000, 0.4),
('BTC', 'Bitcoin', 'https://currency-trade.s3.ap-east-1.amazonaws.com/icons/BTC.png', 67799.16, 2.45, 'crypto', 1.96, 200, 15.0),
('ETH', 'Ethereum', 'https://currency-trade.s3.ap-east-1.amazonaws.com/icons/ETH.png', 3456.78, 1.12, 'crypto', 1.92, 100, 1.2),
('XAU', 'Gold', 'https://currency-trade.s3.ap-east-1.amazonaws.com/icons/XAU.png', 2150.50, -0.34, 'commodity', 1.75, 50, 0.5);

-- Seed Data: Initial Trades
INSERT IGNORE INTO trading_trades (user_id, symbol, trading_type, amount, currency, direction, duration, entry_price, exit_price, profit, status, created_at)
VALUES 
(1, 'XAU', 'up-down', 1.01, 'USDT', 'up', 15, 4726.72, 4728.49, 0.757, 'won', NOW() - INTERVAL 5 MINUTE),
(1, 'ETH', 'up-down', 1.001, 'USDT', 'down', 30, 2291.04, 2290.60, -1.001, 'lost', NOW() - INTERVAL 10 MINUTE);

-- Sample Contract Trade
INSERT IGNORE INTO trading_trades (user_id, symbol, trading_type, order_type, amount, currency, direction, leverage, entry_price, tp_price, sl_price, status, created_at)
VALUES
(1, 'STONKS', 'contract', 'market', 4.001, 'USDC', 'buy', 10, 945.37, 960.00, 930.00, 'pending', NOW() - INTERVAL 1 HOUR);
