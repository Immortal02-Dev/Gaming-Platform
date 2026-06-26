const db = require("../../config/db");

// GET /api/admin/event-setting
exports.getEventSettings = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT setting_key, setting_value FROM platform_settings WHERE setting_key LIKE 'event_%'`,
    );
    const settings = rows.reduce((acc, row) => {
      acc[row.setting_key] = row.setting_value;
      return acc;
    }, {});
    res.json({ ReturnCode: 0, ReturnMessage: "Success", data: settings });
  } catch (err) {
    console.error(err);
    res.json({
      ReturnCode: -1,
      ReturnMessage: "Failed to fetch event settings",
    });
  }
};

// PUT /api/admin/event-setting
exports.updateEventSettings = async (req, res) => {
  const settings = req.body;
  try {
    const promises = Object.entries(settings).map(([key, value]) =>
      db.query(
        `INSERT INTO platform_settings (setting_key, setting_value) VALUES (?, ?) ON DUPLICATE KEY UPDATE setting_value = VALUES(setting_value)`,
        [key, value],
      ),
    );
    await Promise.all(promises);
    res.json({ ReturnCode: 0, ReturnMessage: "Event settings updated" });
  } catch (err) {
    console.error(err);
    res.json({
      ReturnCode: -1,
      ReturnMessage: "Failed to update event settings",
    });
  }
};

// GET /api/admin/event-setting/charge-events
exports.getChargeEvents = async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT chargeEventIdx, stratTime, endTime, eventBonusCommission, eventBonusLimit, eventUseYN, created_at, updated_at FROM charge_events ORDER BY chargeEventIdx DESC`,
    );
    res.json({ ReturnCode: 0, ReturnMessage: "Success", data: rows });
  } catch (err) {
    console.error(err);
    res.json({ ReturnCode: -1, ReturnMessage: "Failed to fetch events" });
  }
};

// POST /api/admin/event-setting/charge-events
exports.createChargeEvent = async (req, res) => {
  const {
    stratTime,
    endTime,
    eventBonusCommission,
    eventBonusLimit,
    eventUseYN,
  } = req.body;
  try {
    const [result] = await db.query(
      `INSERT INTO charge_events (stratTime, endTime, eventBonusCommission, eventBonusLimit, eventUseYN) VALUES (?,?,?,?,?)`,
      [stratTime, endTime, eventBonusCommission, eventBonusLimit, eventUseYN],
    );
    res.json({
      ReturnCode: 0,
      ReturnMessage: "Event created",
      data: { chargeEventIdx: result.insertId },
    });
  } catch (err) {
    console.error(err);
    res.json({ ReturnCode: -1, ReturnMessage: "Failed to create event" });
  }
};

// PUT /api/admin/event-setting/charge-events/:id
exports.updateChargeEvent = async (req, res) => {
  const { id } = req.params;
  const {
    stratTime,
    endTime,
    eventBonusCommission,
    eventBonusLimit,
    eventUseYN,
  } = req.body;
  try {
    await db.query(
      `UPDATE charge_events SET stratTime = ?, endTime = ?, eventBonusCommission = ?, eventBonusLimit = ?, eventUseYN = ? WHERE chargeEventIdx = ?`,
      [
        stratTime,
        endTime,
        eventBonusCommission,
        eventBonusLimit,
        eventUseYN,
        id,
      ],
    );
    res.json({ ReturnCode: 0, ReturnMessage: "Event updated" });
  } catch (err) {
    console.error(err);
    res.json({ ReturnCode: -1, ReturnMessage: "Failed to update event" });
  }
};

// DELETE /api/admin/event-setting/charge-events/:id
exports.deleteChargeEvent = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query(`DELETE FROM charge_events WHERE chargeEventIdx = ?`, [id]);
    res.json({ ReturnCode: 0, ReturnMessage: "Event deleted" });
  } catch (err) {
    console.error(err);
    res.json({ ReturnCode: -1, ReturnMessage: "Failed to delete event" });
  }
};
