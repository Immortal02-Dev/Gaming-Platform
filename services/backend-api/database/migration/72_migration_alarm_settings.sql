-- Create alarm_settings table
CREATE TABLE IF NOT EXISTS alarm_settings (
  idx INT AUTO_INCREMENT PRIMARY KEY,
  alarm_id INT NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  sound_idx INT DEFAULT 0,
  count_type INT DEFAULT 1,
  win_amount DECIMAL(15,2) DEFAULT 0,
  site_idx INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Insert default alarm settings
INSERT IGNORE INTO alarm_settings (alarm_id, name, sound_idx, count_type, win_amount, site_idx) VALUES
(1, '신규회원', 0, 1, 0, 1),
(2, '신규파트너', 0, 1, 0, 1),
(3, '충전신청', 0, 1, 0, 1),
(4, '환전신청', 0, 1, 0, 1),
(5, '문의알람', 0, 1, 0, 1),
(6, '페이백알람', 0, 1, 0, 1),
(7, '스포츠 당첨알람', 0, 1, 1000, 1),
(8, '카지노 당첨알람', 0, 1, 1000, 1),
(9, '슬롯 당첨알람', 0, 1, 1000, 1),
(10, '미니게임 당첨알람', 0, 1, 1000, 1),
(11, '보드게임 당첨알람', 0, 1, 1000, 1);