const db = require("../../config/db");

// GET /api/admin/alarm/counts
exports.getAlarmCounts = async (req, res) => {
  try {
    const [settings] = await db.query("SELECT * FROM alarm_settings");
    const settingMap = {};
    settings.forEach(s => {
      settingMap[s.alarm_id] = s;
    });

    const [[userCount]] = await db.query(
      "SELECT COUNT(*) as count FROM users WHERE DATE(created_at) = CURDATE()"
    );

    const [[partnerCount]] = await db.query(
      "SELECT COUNT(*) as count FROM users WHERE is_agent = 1 AND DATE(created_at) = CURDATE()"
    );

    const [[depositCount]] = await db.query(
      "SELECT COUNT(*) as count FROM wallet_transactions WHERE type = 'deposit' AND status = 'pending'"
    );

    const [[withdrawCount]] = await db.query(
      "SELECT COUNT(*) as count FROM wallet_transactions WHERE type = 'withdraw' AND status = 'pending'"
    );

    const [[qnaCount]] = await db.query(
      "SELECT COUNT(*) as count FROM boards WHERE board_type = 'qna' AND DATE(created_at) = CURDATE()"
    );

    const [[paybackCount]] = await db.query(
      "SELECT COUNT(*) as count FROM payback_requests WHERE status = 1"
    );

    const sportWinCount = await getCount("sport_bet_orders", settingMap[7]?.win_amount, "bet_status", "win", "bet_time", "win_money");
    const casinoWinCount = await getCount("casino_bet_orders", settingMap[8]?.win_amount, "win_money", 0.01, "bet_time", "win_money", ">=");
    const slotWinCount = await getCount("slot_bet_orders", settingMap[9]?.win_amount, "win_money", 0.01, "bet_time", "win_money", ">=");
    const miniWinCount = await getCount("arcade_bets", settingMap[10]?.win_amount, "win_money", 0.01, "bet_time", "win_money", ">=");
    const boardWinCount = await getCount("board_bet_orders", settingMap[11]?.win_amount, "win_money", 0.01, "game_time", "win_money", ">=");

    res.json({
      success: true,
      data: {
        1: userCount.count,
        2: partnerCount.count,
        3: depositCount.count,
        4: withdrawCount.count,
        5: qnaCount.count,
        6: paybackCount.count,
        7: sportWinCount,
        8: casinoWinCount,
        9: slotWinCount,
        10: miniWinCount,
        11: boardWinCount
      },
      settings: settingMap
    });
  } catch (error) {
    console.error("Failed to fetch alarm counts:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

async function getCount(table, threshold, statusCol, winValue, timeCol, amountCol, operator = "=") {
  if (!threshold || threshold <= 0) return 0;
  try {
    const lastHour = new Date(Date.now() - 3600000);
    const [rows] = await db.query(
      `SELECT COUNT(*) as count FROM ${table} WHERE ${statusCol} ${operator} ? AND ${amountCol} >= ? AND ${timeCol} >= ?`,
      [winValue, threshold, lastHour]
    );
    return rows[0].count;
  } catch (e) {
    console.error(`Error counting ${table}:`, e.message);
    return 0;
  }
}
