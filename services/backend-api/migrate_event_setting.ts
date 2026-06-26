import db from "./config/db";

// Ensure the charge_events table exists
(async () => {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS charge_events (
        chargeEventIdx INT AUTO_INCREMENT PRIMARY KEY,
        stratTime TIME NOT NULL,
        endTime TIME NOT NULL,
        eventBonusCommission DECIMAL(10,2) NOT NULL,
        eventBonusLimit DECIMAL(10,2) NOT NULL,
        eventUseYN TINYINT(1) NOT NULL DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB;
    `);
    console.log("charge_events table ensured");
  } catch (err) {
    console.error("Failed to ensure charge_events table", err);
  } finally {
    process.exit(0);
  }
})();
