-- Migration: Create coupons table for admin-issued user coupons
CREATE TABLE IF NOT EXISTS coupons (
  id INT(11) NOT NULL AUTO_INCREMENT,
  receiver_id INT(11) NOT NULL COMMENT 'User who receives the coupon',
  subject VARCHAR(255) NOT NULL COMMENT 'Coupon title/description',
  amount DECIMAL(20,2) NOT NULL DEFAULT 0 COMMENT 'Coupon amount in KRW',
  status TINYINT(1) NOT NULL DEFAULT 0 COMMENT '0=대기(Pending), 1=사용(Used), 2=취소(Cancelled), 3=만료(Expired)',
  register_id INT(11) DEFAULT NULL COMMENT 'Admin who issued the coupon',
  register_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Issue date',
  use_date DATETIME DEFAULT NULL COMMENT 'Date when coupon was used',
  expire_date DATE NOT NULL COMMENT 'Expiry date',
  PRIMARY KEY (id),
  KEY idx_coupons_receiver_id (receiver_id),
  KEY idx_coupons_register_id (register_id),
  KEY idx_coupons_status (status),
  KEY idx_coupons_register_date (register_date),
  KEY idx_coupons_expire_date (expire_date),
  CONSTRAINT fk_coupons_receiver FOREIGN KEY (receiver_id) REFERENCES users (id) ON DELETE CASCADE,
  CONSTRAINT fk_coupons_register FOREIGN KEY (register_id) REFERENCES users (id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
