const express = require("express");
const router = express.Router();
const referralController = require("../controllers/referralController");
const authMiddleware = require("../middleware/authMiddleware");

// PUBLIC
router.get("/live-rewards", referralController.getLiveRewards);
router.get("/rules", referralController.getReferralRules);
router.get("/verify/:code", referralController.verifyReferralCode);

// PROTECTED
router.get("/stats", authMiddleware, referralController.getReferralStats);
router.get("/rewards", authMiddleware, referralController.getReferralRewards);
router.get("/summary", authMiddleware, referralController.getReferralSummary);
router.get("/friends", authMiddleware, referralController.getReferralFriends);
router.get(
  "/commission",
  authMiddleware,
  referralController.getReferralCommission,
);
router.get(
  "/activities",
  authMiddleware,
  referralController.getReferralActivities,
);
router.get("/codes", authMiddleware, referralController.getReferralCodes);
router.post("/codes", authMiddleware, referralController.createReferralCode);
router.get(
  "/level-up-rewards",
  authMiddleware,
  referralController.getLevelUpRewards,
);
router.post("/withdraw", authMiddleware, referralController.withdrawRewards);
router.post("/swap", authMiddleware, referralController.swapRewards);

module.exports = router;
