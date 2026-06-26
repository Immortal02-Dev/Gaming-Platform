import db from "./config/db";

async function migrateBankSetting() {
  const connection = await (db as any).getConnection();
  try {
    console.log("Starting bank setting migration...");

    // 1. banks table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS banks (
        bankIdx     INT UNSIGNED NOT NULL AUTO_INCREMENT,
        bankName    VARCHAR(64)  NOT NULL,
        useYN       TINYINT      NOT NULL DEFAULT 1 COMMENT '1=사용, 0=미사용',
        created_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at  DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (bankIdx),
        UNIQUE KEY uq_bankName (bankName)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);
    console.log("✅ banks table ready");

    // 2. charge_banks table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS charge_banks (
        bankIdx      INT UNSIGNED NOT NULL AUTO_INCREMENT,
        bankName     VARCHAR(64)  NOT NULL,
        bankerName   VARCHAR(64)  NOT NULL,
        bankNumber   VARCHAR(64)  NOT NULL,
        useYN        TINYINT      NOT NULL DEFAULT 1 COMMENT '1=사용, 0=미사용',
        autoYN       TINYINT      NOT NULL DEFAULT 0 COMMENT '1=자동등록지정, 0=해제',
        registerDate DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        PRIMARY KEY (bankIdx)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);
    console.log("✅ charge_banks table ready");

    console.log("Migration complete!");
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  } finally {
    connection.release();
    process.exit(0);
  }
}

migrateBankSetting();
