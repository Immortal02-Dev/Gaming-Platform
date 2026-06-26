-- Migration: Add MFA support to users table
ALTER TABLE users 
ADD COLUMN two_factor_secret VARCHAR(255) DEFAULT NULL,
ADD COLUMN two_factor_enabled BOOLEAN DEFAULT FALSE;
