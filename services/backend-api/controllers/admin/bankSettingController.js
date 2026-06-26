const db = require("../../config/db");

// ── Banks (은행 목록) ──────────────────────────────────────────────────────────

/**
 * GET /api/admin/bank-setting/banks
 * List all banks
 */
exports.getBanks = async (req, res) => {
  try {
    const [rows] = await db.execute(
      "SELECT bankIdx, bankName, useYN, created_at, updated_at FROM banks ORDER BY bankName ASC"
    );
    res.status(200).json({ ReturnCode: 0, ReturnMessage: "Success", data: rows });
  } catch (error) {
    console.error("getBanks Error:", error);
    res.status(500).json({ ReturnCode: 1, ReturnMessage: error.message });
  }
};

/**
 * POST /api/admin/bank-setting/banks
 * Add a new bank
 */
exports.addBank = async (req, res) => {
  try {
    const { bankName } = req.body;
    if (!bankName || !bankName.trim()) {
      return res
        .status(400)
        .json({ ReturnCode: 1, ReturnMessage: "은행명은 필수입니다." });
    }

    const [existing] = await db.execute(
      "SELECT bankIdx FROM banks WHERE bankName = ?",
      [bankName.trim()]
    );
    if (existing.length > 0) {
      return res
        .status(400)
        .json({ ReturnCode: 1, ReturnMessage: "이미 등록된 은행명입니다." });
    }

    await db.execute(
      "INSERT INTO banks (bankName, useYN) VALUES (?, 1)",
      [bankName.trim()]
    );
    res.status(201).json({ ReturnCode: 0, ReturnMessage: "은행이 등록되었습니다." });
  } catch (error) {
    console.error("addBank Error:", error);
    res.status(500).json({ ReturnCode: 1, ReturnMessage: error.message });
  }
};

/**
 * PUT /api/admin/bank-setting/banks/:bankIdx
 * Update bank useYN toggle
 */
exports.updateBank = async (req, res) => {
  try {
    const { bankIdx } = req.params;
    const { useYN } = req.body;

    if (useYN === undefined) {
      return res
        .status(400)
        .json({ ReturnCode: 1, ReturnMessage: "useYN 값이 필요합니다." });
    }

    const [result] = await db.execute(
      "UPDATE banks SET useYN = ? WHERE bankIdx = ?",
      [useYN ? 1 : 0, bankIdx]
    );
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ ReturnCode: 1, ReturnMessage: "은행을 찾을 수 없습니다." });
    }
    res.status(200).json({ ReturnCode: 0, ReturnMessage: "수정되었습니다." });
  } catch (error) {
    console.error("updateBank Error:", error);
    res.status(500).json({ ReturnCode: 1, ReturnMessage: error.message });
  }
};

/**
 * DELETE /api/admin/bank-setting/banks/:bankIdx
 * Delete a bank
 */
exports.deleteBank = async (req, res) => {
  try {
    const { bankIdx } = req.params;
    const [result] = await db.execute(
      "DELETE FROM banks WHERE bankIdx = ?",
      [bankIdx]
    );
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ ReturnCode: 1, ReturnMessage: "은행을 찾을 수 없습니다." });
    }
    res.status(200).json({ ReturnCode: 0, ReturnMessage: "삭제되었습니다." });
  } catch (error) {
    console.error("deleteBank Error:", error);
    res.status(500).json({ ReturnCode: 1, ReturnMessage: error.message });
  }
};

// ── Charge Banks (충전 은행) ───────────────────────────────────────────────────

/**
 * GET /api/admin/bank-setting/charge-banks
 * List all charge banks
 */
exports.getChargeBanks = async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT bankIdx, bankName, bankerName, bankNumber, useYN, autoYN,
              registerDate, updated_at
       FROM charge_banks
       ORDER BY registerDate DESC`
    );
    res.status(200).json({ ReturnCode: 0, ReturnMessage: "Success", data: rows });
  } catch (error) {
    console.error("getChargeBanks Error:", error);
    res.status(500).json({ ReturnCode: 1, ReturnMessage: error.message });
  }
};

/**
 * POST /api/admin/bank-setting/charge-banks
 * Add a new charge bank account
 */
exports.addChargeBank = async (req, res) => {
  try {
    const { chargeBankName, chargeBankerName, chargeBankNumber } = req.body;

    if (!chargeBankName || !chargeBankName.trim()) {
      return res
        .status(400)
        .json({ ReturnCode: 1, ReturnMessage: "은행명은 필수입니다." });
    }
    if (!chargeBankerName || !chargeBankerName.trim()) {
      return res
        .status(400)
        .json({ ReturnCode: 1, ReturnMessage: "예금주는 필수입니다." });
    }
    if (!chargeBankNumber || !chargeBankNumber.trim()) {
      return res
        .status(400)
        .json({ ReturnCode: 1, ReturnMessage: "계좌번호는 필수입니다." });
    }

    await db.execute(
      `INSERT INTO charge_banks (bankName, bankerName, bankNumber, useYN, autoYN, registerDate)
       VALUES (?, ?, ?, 1, 0, NOW())`,
      [chargeBankName.trim(), chargeBankerName.trim(), chargeBankNumber.trim()]
    );
    res
      .status(201)
      .json({ ReturnCode: 0, ReturnMessage: "충전 은행이 등록되었습니다." });
  } catch (error) {
    console.error("addChargeBank Error:", error);
    res.status(500).json({ ReturnCode: 1, ReturnMessage: error.message });
  }
};

/**
 * PUT /api/admin/bank-setting/charge-banks/:bankIdx
 * Update charge bank useYN toggle
 */
exports.updateChargeBank = async (req, res) => {
  try {
    const { bankIdx } = req.params;
    const { useYN } = req.body;

    if (useYN === undefined) {
      return res
        .status(400)
        .json({ ReturnCode: 1, ReturnMessage: "useYN 값이 필요합니다." });
    }

    const [result] = await db.execute(
      "UPDATE charge_banks SET useYN = ? WHERE bankIdx = ?",
      [useYN ? 1 : 0, bankIdx]
    );
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ ReturnCode: 1, ReturnMessage: "충전 은행을 찾을 수 없습니다." });
    }
    res.status(200).json({ ReturnCode: 0, ReturnMessage: "수정되었습니다." });
  } catch (error) {
    console.error("updateChargeBank Error:", error);
    res.status(500).json({ ReturnCode: 1, ReturnMessage: error.message });
  }
};

/**
 * PUT /api/admin/bank-setting/charge-banks/:bankIdx/auto
 * Toggle autoYN — only one charge bank can have autoYN=1 at a time
 */
exports.toggleAutoYN = async (req, res) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();

    const { bankIdx } = req.params;

    // Check current autoYN state
    const [rows] = await connection.execute(
      "SELECT autoYN FROM charge_banks WHERE bankIdx = ?",
      [bankIdx]
    );
    if (rows.length === 0) {
      await connection.rollback();
      return res
        .status(404)
        .json({ ReturnCode: 1, ReturnMessage: "충전 은행을 찾을 수 없습니다." });
    }

    const currentAutoYN = rows[0].autoYN;

    if (currentAutoYN === 0) {
      // Set this one to auto, clear all others
      await connection.execute("UPDATE charge_banks SET autoYN = 0");
      await connection.execute(
        "UPDATE charge_banks SET autoYN = 1 WHERE bankIdx = ?",
        [bankIdx]
      );
    } else {
      // Toggle off
      await connection.execute(
        "UPDATE charge_banks SET autoYN = 0 WHERE bankIdx = ?",
        [bankIdx]
      );
    }

    await connection.commit();
    res
      .status(200)
      .json({ ReturnCode: 0, ReturnMessage: "자동등록 설정이 변경되었습니다." });
  } catch (error) {
    await connection.rollback();
    console.error("toggleAutoYN Error:", error);
    res.status(500).json({ ReturnCode: 1, ReturnMessage: error.message });
  } finally {
    connection.release();
  }
};

/**
 * DELETE /api/admin/bank-setting/charge-banks/:bankIdx
 * Delete a charge bank account
 */
exports.deleteChargeBank = async (req, res) => {
  try {
    const { bankIdx } = req.params;
    const [result] = await db.execute(
      "DELETE FROM charge_banks WHERE bankIdx = ?",
      [bankIdx]
    );
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ ReturnCode: 1, ReturnMessage: "충전 은행을 찾을 수 없습니다." });
    }
    res.status(200).json({ ReturnCode: 0, ReturnMessage: "삭제되었습니다." });
  } catch (error) {
    console.error("deleteChargeBank Error:", error);
    res.status(500).json({ ReturnCode: 1, ReturnMessage: error.message });
  }
};
