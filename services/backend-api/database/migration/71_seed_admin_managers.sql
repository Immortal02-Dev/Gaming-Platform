-- Seed admin_managers from existing admin/super_admin users in the users table
-- Maps: admin → userRoleIdx 1 (super admin), admin → userRoleIdx 2 (admin)
-- userStatusIdx 2 = 허용 (allowed), 3 = 불가 (denied)

INSERT IGNORE INTO admin_managers
  (registerUserIdx, userId, password, nickName, userRoleIdx, userStatusIdx,
   allowLiveInfo, allowAlarmCount, allowDashboard, memo, registerDate)
SELECT
  NULL                                    AS registerUserIdx,
  u.username                              AS userId,
  u.password                              AS password,
  COALESCE(u.nickname, u.username)        AS nickName,
  CASE u.role
    WHEN 'super_admin' THEN 1
    ELSE 2
  END                                     AS userRoleIdx,
  2                                       AS userStatusIdx,
  1                                       AS allowLiveInfo,
  1                                       AS allowAlarmCount,
  1                                       AS allowDashboard,
  CONCAT('Imported from users table (', u.role, ')') AS memo,
  COALESCE(u.created_at, NOW())           AS registerDate
FROM users u
WHERE u.role IN ('admin', 'super_admin');

-- Grant all permissions (read + write) to all imported managers
INSERT IGNORE INTO admin_manager_permissions (managerIdx, permissionId, readYN, writeYN)
SELECT
  m.managerIdx,
  p.id AS permissionId,
  1    AS readYN,
  1    AS writeYN
FROM admin_managers m
CROSS JOIN (
  SELECT  1 AS id UNION SELECT  2 UNION SELECT  3 UNION SELECT  4 UNION SELECT  5
  UNION SELECT  8 UNION SELECT  9 UNION SELECT 10 UNION SELECT 11 UNION SELECT 12
  UNION SELECT 13 UNION SELECT 14 UNION SELECT 15 UNION SELECT 16 UNION SELECT 17
  UNION SELECT 18 UNION SELECT 19 UNION SELECT 20 UNION SELECT 21 UNION SELECT 22
  UNION SELECT 23 UNION SELECT 24 UNION SELECT 25 UNION SELECT 28 UNION SELECT 29
  UNION SELECT 31 UNION SELECT 32 UNION SELECT 34 UNION SELECT 35 UNION SELECT 36
  UNION SELECT 39 UNION SELECT 40 UNION SELECT 41 UNION SELECT 50 UNION SELECT 51
  UNION SELECT 53 UNION SELECT 54 UNION SELECT 55 UNION SELECT 57 UNION SELECT 58
  UNION SELECT 59 UNION SELECT 61 UNION SELECT 62 UNION SELECT 64 UNION SELECT 65
) p;
