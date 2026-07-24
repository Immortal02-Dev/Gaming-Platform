const db = require("../../config/db");

// ─────────────────────────────────────────────────────────────────────────────
// Helper: build a WHERE clause + params from the common batch target fields
// ─────────────────────────────────────────────────────────────────────────────
function buildWhereClause({ checkAll, userIdx, child, userDistributor, userGrade }) {
  const params = [];
  let where = "WHERE 1=1";

  // Exclude admin / super_admin from batch operations
  where += " AND role = 'user'";

  if (!checkAll || parseInt(checkAll) !== 1) {
    if (userIdx) {
      // Specific user (+ optionally their downline via child flag)
      if (parseInt(child) === 1) {
        // userIdx is a partner — apply to all users under them
        where += " AND (id = ? OR referral_code IN (SELECT referral_code FROM users WHERE id = ?))";
        params.push(userIdx, userIdx);
      } else {
        where += " AND id = ?";
        params.push(userIdx);
      }
    } else if (userDistributor !== undefined && userDistributor !== "") {
      const lvl = parseInt(userDistributor);
      if (!isNaN(lvl)) {
        where += " AND agent_level = ?";
        params.push(lvl);
      }
    } else if (userGrade !== undefined && userGrade !== "") {
      const grade = parseInt(userGrade);
      if (!isNaN(grade)) {
        where += " AND vip_level_id = ?";
        params.push(grade);
      }
    }
  }

  return { where, params };
}

// ─────────────────────────────────────────────────────────────────────────────
// Generic batch update helper
// ─────────────────────────────────────────────────────────────────────────────
async function batchUpdate(req, res, column, value, actionLabel) {
  try {
    const { checkAll, userIdx, child, userDistributor, userGrade } = req.body;
    const { where, params } = buildWhereClause({ checkAll, userIdx, child, userDistributor, userGrade });

    const sql = `UPDATE users SET ${column} = ? ${where}`;
    const [result] = await db.execute(sql, [value, ...params]);

    res.json({
      success: true,
      message: `${actionLabel} 일괄 적용 완료`,
      affectedRows: result.affectedRows,
    });
  } catch (error) {
    console.error(`Batch [${actionLabel}] Error:`, error);
    res.status(500).json({ success: false, message: error.message });
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Charge Bank
// POST /api/admin/user/batch/chargeBank
// ─────────────────────────────────────────────────────────────────────────────
exports.chargeBank = async (req, res) => {
  const { bankIdx } = req.body;
  await batchUpdate(req, res, "charge_bank_idx", bankIdx || null, "충전 계좌 지정");
};

// ─────────────────────────────────────────────────────────────────────────────
// Charge API — stored as a metadata JSON column or similar; stored as custom field
// POST /api/admin/user/batch/chargeApiIdx
// ─────────────────────────────────────────────────────────────────────────────
exports.chargeApiIdx = async (req, res) => {
  // charge_api_idx is not in the current schema; acknowledge gracefully
  res.json({ success: true, message: "충전 API 지정 일괄 적용 완료 (미구현 컬럼)", affectedRows: 0 });
};

// ─────────────────────────────────────────────────────────────────────────────
// 첫충 보너스 (금일환전)
// POST /api/admin/user/batch/firstCharge
// ─────────────────────────────────────────────────────────────────────────────
exports.firstCharge = async (req, res) => {
  res.json({ success: true, message: "첫충 보너스 금일환전 일괄 적용 완료 (미구현 컬럼)", affectedRows: 0 });
};

// POST /api/admin/user/batch/firstChargeCommission
exports.firstChargeCommission = async (req, res) => {
  res.json({ success: true, message: "첫충 요율 일괄 적용 완료 (미구현 컬럼)", affectedRows: 0 });
};

// ─────────────────────────────────────────────────────────────────────────────
// 매충 보너스 (금일환전)
// ─────────────────────────────────────────────────────────────────────────────
exports.everyCharge = async (req, res) => {
  res.json({ success: true, message: "매충 보너스 금일환전 일괄 적용 완료 (미구현 컬럼)", affectedRows: 0 });
};

exports.everyChargeCommission = async (req, res) => {
  res.json({ success: true, message: "매충 요율 일괄 적용 완료 (미구현 컬럼)", affectedRows: 0 });
};

// ─────────────────────────────────────────────────────────────────────────────
// 통합 보너스
// ─────────────────────────────────────────────────────────────────────────────
exports.userIntegrateChargeBonusUseYN = async (req, res) => {
  res.json({ success: true, message: "통합 보너스 사용유무 일괄 적용 완료 (미구현 컬럼)", affectedRows: 0 });
};

exports.userIntegrateChargeBonusAuth = async (req, res) => {
  res.json({ success: true, message: "통합 보너스 사용권한 일괄 적용 완료 (미구현 컬럼)", affectedRows: 0 });
};

exports.userIntegrateChargeBonus = async (req, res) => {
  res.json({ success: true, message: "통합충전 보너스 일괄 적용 완료 (미구현 컬럼)", affectedRows: 0 });
};

// ─────────────────────────────────────────────────────────────────────────────
// 회원 콤프 요율 → custom_commission
// POST /api/admin/user/batch/comp
// ─────────────────────────────────────────────────────────────────────────────
exports.comp = async (req, res) => {
  const { comp } = req.body;
  const value = comp !== undefined && comp !== "" ? parseFloat(comp) : null;
  await batchUpdate(req, res, "custom_commission", value, "회원 콤프 요율");
};

// ─────────────────────────────────────────────────────────────────────────────
// Partner / User auth permission stubs (no columns yet in DB)
// ─────────────────────────────────────────────────────────────────────────────
const stubOk = (label) => async (req, res) => {
  res.json({ success: true, message: `${label} 일괄 적용 완료 (미구현 컬럼)`, affectedRows: 0 });
};

exports.partnerAddAuth             = stubOk("파트너 등록 권한");
exports.partnerAddAuthLock         = stubOk("파트너 등록 잠금");
exports.partnerModifyAuth          = stubOk("파트너 수정 권한");
exports.partnerModifyAuthLock      = stubOk("파트너 수정 잠금");
exports.partnerPasswordModifyAuth  = stubOk("파트너 비밀번호 수정");
exports.partnerPasswordModifyAuthLock = stubOk("파트너 비밀번호 수정 잠금");
exports.partnerCommissionAuth      = stubOk("파트너 수수료 등록/수정");
exports.partnerCommissionAuthLock  = stubOk("파트너 수수료 잠금");

exports.userAddAuth                = stubOk("회원 등록 권한");
exports.userAddAuthLock            = stubOk("회원 등록 잠금");
exports.userMultiRegisterAuth      = stubOk("회원 일괄 등록 권한");
exports.userModifyAuth             = stubOk("회원 수정 권한");
exports.userModifyAuthLock         = stubOk("회원 수정 잠금");
exports.userPasswordModifyAuth     = stubOk("회원 비밀번호 수정");
exports.userPasswordModifyAuthLock = stubOk("회원 비밀번호 수정 잠금");
exports.userCommissionAuth         = stubOk("회원 수수료 등록/수정");
exports.userCommissionAuthLock     = stubOk("회원 수수료 잠금");
exports.userMoneyChargeAuth        = stubOk("게임머니 지급/회수");
exports.userMoneyChargeAuthLock    = stubOk("게임머니 지급/회수 잠금");
exports.userCasinoMoneyChargeAuth  = stubOk("카지노머니 지급/회수");
exports.userCasinoMoneyChargeAuthLock = stubOk("카지노머니 지급/회수 잠금");

exports.pointChangeAuth            = stubOk("포인트 전환 사용");
exports.pointChangeAuthLock        = stubOk("포인트 전환 잠금");
exports.pointChangeUserWebAuth     = stubOk("포인트 유저웹 표시");
exports.pointChangeUserWebAuthLock = stubOk("포인트 유저웹 표시 잠금");

exports.exchangePasswordUseYN      = stubOk("환전 비밀번호 사용");
exports.isUseChargeBonus           = stubOk("충전 보너스 사용유무");
exports.userSitePasswordEditYN     = stubOk("비밀번호 변경(유저웹)");

// ─────────────────────────────────────────────────────────────────────────────
// 회원 레벨 변경 → vip_level_id
// POST /api/admin/user/batch/userGradeModify
// ─────────────────────────────────────────────────────────────────────────────
exports.userGradeModify = async (req, res) => {
  const { userGradeModify } = req.body;
  const value = userGradeModify !== undefined ? parseInt(userGradeModify) : null;
  await batchUpdate(req, res, "vip_level_id", value, "회원 레벨 변경");
};

// ─────────────────────────────────────────────────────────────────────────────
// 게임별 레벨 변경 → sport_level / casino_level / slot_level / mini_game_level / board_game_level
// POST /api/admin/user/batch/userGameGrade
// ─────────────────────────────────────────────────────────────────────────────
exports.userGameGrade = async (req, res) => {
  try {
    const { checkAll, userIdx, child, userDistributor, userGrade, gameGroupIdx, userGameGradeIdx } = req.body;

    const columnMap = {
      "1": "sport_level",
      "2": "casino_level",
      "3": "slot_level",
      "4": "mini_game_level",
      "5": "board_game_level",
    };

    const column = columnMap[String(gameGroupIdx)];
    if (!column) {
      return res.status(400).json({ success: false, message: "올바르지 않은 게임 그룹입니다." });
    }

    const gradeValue = parseInt(userGameGradeIdx);
    if (isNaN(gradeValue)) {
      return res.status(400).json({ success: false, message: "올바르지 않은 레벨 값입니다." });
    }

    const { where, params } = buildWhereClause({ checkAll, userIdx, child, userDistributor, userGrade });
    const sql = `UPDATE users SET ${column} = ? ${where}`;
    const [result] = await db.execute(sql, [gradeValue, ...params]);

    res.json({
      success: true,
      message: `게임별 레벨 변경 일괄 적용 완료`,
      affectedRows: result.affectedRows,
    });
  } catch (error) {
    console.error("Batch [userGameGrade] Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// 회원 상태 변경 → status
// POST /api/admin/user/batch/userStatusIdx
// ─────────────────────────────────────────────────────────────────────────────
exports.userStatusIdx = async (req, res) => {
  try {
    const { userStatusIdx, checkAll, userIdx, child, userDistributor, userGrade } = req.body;

    const statusMap = {
      "1": "ACTIVE",     // 가입대기
      "2": "ACTIVE",     // 정상
      "3": "SUSPENDED",  // 정지
      "4": "BANNED",     // 탈퇴
    };

    const mappedStatus = statusMap[String(userStatusIdx)];
    if (!mappedStatus) {
      return res.status(400).json({ success: false, message: "올바르지 않은 상태 값입니다." });
    }

    const { where, params } = buildWhereClause({ checkAll, userIdx, child, userDistributor, userGrade });
    const sql = `UPDATE users SET status = ? ${where}`;
    const [result] = await db.execute(sql, [mappedStatus, ...params]);

    res.json({
      success: true,
      message: `회원 상태 변경 일괄 적용 완료`,
      affectedRows: result.affectedRows,
    });
  } catch (error) {
    console.error("Batch [userStatusIdx] Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
