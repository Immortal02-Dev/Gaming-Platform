-- 30_migration_referral_friends.sql
-- Adds referral_friends table, milestones, and extends referral_stats.

-- Drop new tables to ensure clean recreate with updated schema
DROP TABLE IF EXISTS referral_level_up_milestones;
DROP TABLE IF EXISTS referral_codes;
DROP TABLE IF EXISTS referral_live_rewards;
DROP TABLE IF EXISTS referral_friends;

-- Extend referral_stats with new columns
ALTER TABLE referral_stats
  ADD COLUMN IF NOT EXISTS available_commission DECIMAL(20,8) DEFAULT 0,
  ADD COLUMN IF NOT EXISTS locked_referral DECIMAL(20,8) DEFAULT 0;

-- Tracks each friend referred by a user
CREATE TABLE referral_friends (
  id INT AUTO_INCREMENT PRIMARY KEY,
  referrer_id INT NOT NULL,
  friend_user_id INT NOT NULL,
  commission_rate DECIMAL(5,2) DEFAULT 25.00,
  total_deposits_7d DECIMAL(20,8) DEFAULT 0,
  total_commission DECIMAL(20,8) DEFAULT 0,
  friend_vip_level INT DEFAULT 1,
  registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_referrer_friend (referrer_id, friend_user_id),
  FOREIGN KEY (referrer_id) REFERENCES users(id)
);

-- Stores live reward feed entries (public ticker)
CREATE TABLE referral_live_rewards (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  amount DECIMAL(20,8) NOT NULL,
  currency VARCHAR(10) DEFAULT 'USDT',
  awarded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tracks different referral codes per user (up to 20)
CREATE TABLE referral_codes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  code VARCHAR(50) UNIQUE NOT NULL,
  link VARCHAR(255) NOT NULL,
  total_friends INT DEFAULT 0,
  total_rewards DECIMAL(20,8) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Stores reward unlock thresholds based on friend VIP levels
CREATE TABLE referral_level_up_milestones (
  id INT AUTO_INCREMENT PRIMARY KEY,
  vip_level INT UNIQUE NOT NULL,
  wager_threshold DECIMAL(20,8) NOT NULL,
  reward_amount DECIMAL(20,8) NOT NULL,
  currency VARCHAR(10) DEFAULT 'USDT'
);
