import db from "./config/db";

async function migrateManagerSetting() {
  const connection = await (db as any).getConnection();
  try {
    console.log("Starting manager setting migration...");

    // 1. admin_ips table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS admin_ips (
        adminIPIdx INT UNSIGNED NOT NULL AUTO_INCREMENT,
        adminIP    VARCHAR(64)  NOT NULL,
        memo       VARCHAR(255) NOT NULL DEFAULT '',
        createdAt  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (adminIPIdx),
        UNIQUE KEY uq_adminIP (adminIP)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);
    console.log("✅ admin_ips table ready");

    // 2. admin_managers table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS admin_managers (
        managerIdx      INT UNSIGNED NOT NULL AUTO_INCREMENT,
        registerUserIdx INT          NULL,
        userId          VARCHAR(64)  NOT NULL,
        password        VARCHAR(255) NOT NULL,
        nickName        VARCHAR(64)  NOT NULL,
        userRoleIdx     TINYINT      NOT NULL DEFAULT 2,
        userStatusIdx   TINYINT      NOT NULL DEFAULT 2 COMMENT '2=허용, 3=불가',
        allowLiveInfo   TINYINT      NOT NULL DEFAULT 1 COMMENT '1=허용, 0=불가',
        allowAlarmCount TINYINT      NOT NULL DEFAULT 1 COMMENT '1=허용, 0=불가',
        allowDashboard  TINYINT      NOT NULL DEFAULT 1 COMMENT '1=허용, 0=불가',
        memo            VARCHAR(255) NOT NULL DEFAULT '',
        registerDate    DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (managerIdx),
        UNIQUE KEY uq_userId (userId),
        UNIQUE KEY uq_nickName (nickName)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);
    console.log("✅ admin_managers table ready");

    // 3. admin_manager_permissions table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS admin_manager_permissions (
        id           INT UNSIGNED NOT NULL AUTO_INCREMENT,
        managerIdx   INT UNSIGNED NOT NULL,
        permissionId INT          NOT NULL,
        readYN       TINYINT      NOT NULL DEFAULT 0,
        writeYN      TINYINT      NOT NULL DEFAULT 0,
        PRIMARY KEY (id),
        UNIQUE KEY uq_manager_perm (managerIdx, permissionId),
        CONSTRAINT fk_mgrperm_manager
          FOREIGN KEY (managerIdx)
          REFERENCES admin_managers (managerIdx)
          ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);
    console.log("✅ admin_manager_permissions table ready");

    console.log("Migration complete!");
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  } finally {
    connection.release();
    process.exit(0);
  }
}

migrateManagerSetting();
