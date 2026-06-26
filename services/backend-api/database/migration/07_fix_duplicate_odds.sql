-- Migration to fix duplicate odds and prevent them in the future
-- This migration is idempotent (safe to run multiple times)

-- 1. Remove duplicate odds, keeping only the most recent one for each (match_id, market_name, outcome_name)
DELETE o1 FROM match_odds o1
INNER JOIN match_odds o2 
WHERE 
    o1.id < o2.id AND 
    o1.match_id = o2.match_id AND 
    o1.market_name = o2.market_name AND 
    o1.outcome_name = o2.outcome_name;

-- 2. Add a UNIQUE constraint only if it doesn't already exist
SET @constraint_exists = (
  SELECT COUNT(*)
  FROM information_schema.TABLE_CONSTRAINTS
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'match_odds'
    AND CONSTRAINT_NAME = 'unique_match_market_outcome'
    AND CONSTRAINT_TYPE = 'UNIQUE'
);

SET @sql = IF(@constraint_exists = 0,
  'ALTER TABLE match_odds ADD CONSTRAINT unique_match_market_outcome UNIQUE (match_id, market_name, outcome_name)',
  'SELECT 1'
);

PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;
