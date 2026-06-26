-- Migration: Trading Tables
CREATE TABLE IF NOT EXISTS trading_markets (
    symbol VARCHAR(20) PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    icon VARCHAR(255),
    price DECIMAL(20, 8) DEFAULT 0,
    change_24h DECIMAL(10, 2) DEFAULT 0,
    type VARCHAR(50) DEFAULT 'crypto',
    payout_multiplier DECIMAL(5, 2) DEFAULT 1.96,
    max_leverage INT DEFAULT 1,
    spread DECIMAL(10, 4) DEFAULT 0,
    buy_volume DECIMAL(20, 8) DEFAULT 0,
    sell_volume DECIMAL(20, 8) DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS trading_trades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    symbol VARCHAR(20) NOT NULL,
    trading_type ENUM('up-down', 'spread', 'contract') DEFAULT 'up-down',
    order_type ENUM('market', 'limit', 'tp-sl') DEFAULT 'market',
    amount DECIMAL(20, 8) NOT NULL,
    currency VARCHAR(20) NOT NULL,
    direction ENUM('up', 'down', 'buy', 'sell') NOT NULL,
    leverage INT DEFAULT 1,
    duration INT NULL, -- for up-down
    entry_price DECIMAL(20, 8) NOT NULL,
    exit_price DECIMAL(20, 8),
    tp_price DECIMAL(20, 8), -- Take Profit
    sl_price DECIMAL(20, 8), -- Stop Loss
    liq_price DECIMAL(20, 8), -- Liquidation Price
    payout DECIMAL(20, 8),
    profit DECIMAL(20, 8),
    status ENUM('pending', 'won', 'lost', 'canceled', 'liquidated') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    resolved_at TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (symbol) REFERENCES trading_markets(symbol)
);
