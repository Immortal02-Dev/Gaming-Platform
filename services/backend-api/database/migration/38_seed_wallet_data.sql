-- Seed initial balances for existing users (assuming user_id 1 exists)
INSERT IGNORE INTO user_balances (user_id, currency, amount) VALUES 
(1, 'KRW', 1000000.00000000),
(1, 'USDT', 500.00000000),
(1, 'BCD', 100.00000000),
(1, 'ETH', 0.50000000),
(1, 'BTC', 0.01000000);

-- Seed a mock deposit address for user 1
INSERT IGNORE INTO crypto_deposit_addresses (user_id, currency, network, address) VALUES 
(1, 'USDT', 'ERC20', '0x29C3CC2526c96661dEa3E73A159455b65733Dd39'),
(1, 'BCD', 'ETHEREUM', '0x29C3CC2526c96661dEa3E73A159455b65733Dd39');

-- Seed mock transactions for user 1
INSERT IGNORE INTO wallet_transactions (user_id, type, currency, amount, balance_after, status) VALUES 
(1, 'deposit', 'USDT', 500.00, 500.00, 'completed'),
(1, 'bonus', 'BCD', 100.00, 100.00, 'completed');
