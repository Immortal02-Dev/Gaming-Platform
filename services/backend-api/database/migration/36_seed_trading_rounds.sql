-- Seed initial rounds for testing
INSERT IGNORE INTO trading_rounds (market_symbol, round_number, start_time, end_time, status)
SELECT 
    symbol as market_symbol,
    1 as round_number,
    CURRENT_TIMESTAMP as start_time,
    CURRENT_TIMESTAMP + INTERVAL 5 MINUTE as end_time,
    'active' as status
FROM trading_markets
WHERE symbol = 'STONKS';

-- Add some initial volume for sentiment testing
UPDATE trading_markets SET buy_volume = 470000, sell_volume = 530000 WHERE symbol = 'STONKS';
