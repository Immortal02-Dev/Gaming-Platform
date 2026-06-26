-- Migration to add trading rounds
CREATE TABLE IF NOT EXISTS trading_rounds (
    id SERIAL PRIMARY KEY,
    market_symbol VARCHAR(20) NOT NULL,
    round_number BIGINT NOT NULL,
    start_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    end_time DATETIME NOT NULL,
    start_price DECIMAL(20, 8),
    end_price DECIMAL(20, 8),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'canceled')),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_market_symbol FOREIGN KEY (market_symbol) REFERENCES trading_markets(symbol),
    CONSTRAINT unique_round_per_market UNIQUE (market_symbol, round_number)
);
