-- Add admin management columns to match_events
ALTER TABLE match_events
  ADD COLUMN admin_is_suspended TINYINT(1) NOT NULL DEFAULT 0 COMMENT '0=available, 1=suspended by admin',
  ADD COLUMN admin_status VARCHAR(20) NOT NULL DEFAULT 'active' COMMENT 'active, suspended',
  ADD COLUMN wait_live TINYINT(1) NOT NULL DEFAULT 0 COMMENT '0=normal, 1=waiting for live',
  ADD COLUMN type_flag TINYINT(1) NOT NULL DEFAULT 1 COMMENT '1=prematch, 2=live',
  ADD COLUMN betting_status VARCHAR(20) NOT NULL DEFAULT 'available' COMMENT 'available, closed, suspended',
  ADD COLUMN updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  ADD KEY idx_match_events_admin_suspended (admin_is_suspended),
  ADD KEY idx_match_events_status (status),
  ADD KEY idx_match_events_type_flag (type_flag),
  ADD KEY idx_match_events_start_time (start_time);
