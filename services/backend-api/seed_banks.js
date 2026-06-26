const db = require("./config/db");

const banks = [
  "BDO",
  "BPI",
  "Metrobank",
  "PNB",
  "UnionBank",
  "RCBC",
  "Security Bank",
  "Maybank",
  "CIMB",
  "Landbank",
];

const chargeBanks = [
  {
    bankName: "BDO",
    bankerName: "Juan dela Cruz",
    bankNumber: "0023-0156-2589-4521",
    autoYN: 1,
  },
  {
    bankName: "BPI",
    bankerName: "Maria Santos",
    bankNumber: "1234-5678-9012-3456",
    autoYN: 0,
  },
  {
    bankName: "Metrobank",
    bankerName: "Carlos Reyes",
    bankNumber: "5432-1098-7654-3210",
    autoYN: 0,
  },
  {
    bankName: "PNB",
    bankerName: "Ana Garcia",
    bankNumber: "9876-5432-1098-7654",
    autoYN: 0,
  },
  {
    bankName: "UnionBank",
    bankerName: "Roberto Martinez",
    bankNumber: "4567-8901-2345-6789",
    autoYN: 0,
  },
];

async function seedBanks() {
  try {
    console.log("🌱 Starting seed...");

    // Seed banks
    console.log("\n📌 Adding banks...");
    for (const bank of banks) {
      try {
        await db.execute("INSERT INTO banks (bankName, useYN) VALUES (?, 1)", [
          bank,
        ]);
        console.log(`✅ ${bank}`);
      } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
          console.log(`⏭️  ${bank} (already exists)`);
        } else {
          console.error(`❌ ${bank}:`, error.message);
        }
      }
    }

    // Seed charge banks
    console.log("\n💳 Adding charge banks...");
    for (const chargeBank of chargeBanks) {
      try {
        await db.execute(
          "INSERT INTO charge_banks (bankName, bankerName, bankNumber, useYN, autoYN, registerDate) VALUES (?, ?, ?, 1, ?, NOW())",
          [
            chargeBank.bankName,
            chargeBank.bankerName,
            chargeBank.bankNumber,
            chargeBank.autoYN,
          ],
        );
        console.log(`✅ ${chargeBank.bankName} (${chargeBank.bankerName})`);
      } catch (error) {
        console.error(`❌ ${chargeBank.bankName}:`, error.message);
      }
    }

    console.log("\n✅ Seed completed!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  }
}

seedBanks();
