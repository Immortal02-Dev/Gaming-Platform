const db = require("../../config/db");

// GET /api/admin/alarm-setting
exports.getAlarmSettings = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT idx, alarm_id, name, sound_idx, count_type, win_amount, site_idx FROM alarm_settings ORDER BY alarm_id ASC`,
    );
    res.json({ ReturnCode: 0, ReturnMessage: "Success", data: rows });
  } catch (err) {
    console.error(err);
    res.json({ ReturnCode: -1, ReturnMessage: "Failed to fetch alarm settings" });
  }
};

// POST /api/admin/alarm-setting/update
exports.updateAlarmSettings = async (req, res) => {
  const { updateData, winAlarmAmount } = req.body;

  try {
    // Start transaction
    const connection = await db.getConnection();
    await connection.beginTransaction();

    try {
      // Update alarm settings
      for (const [alarmId, settings] of Object.entries(updateData)) {
        const { alarmIdx: soundIdx, alarmCountType: countType } = settings as any;

        await connection.query(
          `UPDATE alarm_settings SET sound_idx = ?, count_type = ? WHERE alarm_id = ?`,
          [soundIdx, countType, parseInt(alarmId)]
        );
      }

      // Update win alarm amounts (alarm_id 7-11)
      for (const [winIndex, amount] of Object.entries(winAlarmAmount)) {
        const alarmId = parseInt(winIndex) + 6; // 1->7, 2->8, etc.

        await connection.query(
          `UPDATE alarm_settings SET win_amount = ? WHERE alarm_id = ?`,
          [amount, alarmId]
        );
      }

      await connection.commit();
      res.json({ ReturnCode: 0, ReturnMessage: "Alarm settings updated successfully" });

    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }

  } catch (err) {
    console.error(err);
    res.json({ ReturnCode: -1, ReturnMessage: "Failed to update alarm settings" });
  }
};