import db from "./config/db";

(async () => {
  try {
    // Ensure table exists (in case migration not run)
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

    // Clear existing data
    await db.query(`DELETE FROM charge_events`);

    const sample = [
      {
        stratTime: "09:00",
        endTime: "10:00",
        eventBonusCommission: 5.0,
        eventBonusLimit: 1000,
        eventUseYN: 1,
      },
      {
        stratTime: "12:00",
        endTime: "13:00",
        eventBonusCommission: 7.5,
        eventBonusLimit: 1500,
        eventUseYN: 1,
      },
      {
        stratTime: "18:00",
        endTime: "19:30",
        eventBonusCommission: 10.0,
        eventBonusLimit: 2000,
        eventUseYN: 1,
      },
      {
        stratTime: "21:00",
        endTime: "22:00",
        eventBonusCommission: 8.0,
        eventBonusLimit: 1200,
        eventUseYN: 0,
      },
      {
        stratTime: "23:00",
        endTime: "23:59",
        eventBonusCommission: 12.0,
        eventBonusLimit: 2500,
        eventUseYN: 1,
      },
    ];

    for (const ev of sample) {
      await db.query(
        `INSERT INTO charge_events (stratTime, endTime, eventBonusCommission, eventBonusLimit, eventUseYN) VALUES (?,?,?,?,?)`,
        [
          ev.stratTime,
          ev.endTime,
          ev.eventBonusCommission,
          ev.eventBonusLimit,
          ev.eventUseYN,
        ],
      );
    }
    console.log("Seeded charge_events with realistic data.");
  } catch (err) {
    console.error("Error seeding charge_events", err);
  } finally {
    process.exit(0);
  }
})();
