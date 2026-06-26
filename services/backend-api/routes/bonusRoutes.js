const express = require("express");
const router = express.Router();
const bonusController = require("../controllers/bonusController");
const authMiddleware = require("../middleware/authMiddleware");

// PROTECTED ROUTES
router.get("/stats", authMiddleware, bonusController.getBonusStats);

// Promo Code
router.post("/redeem", authMiddleware, bonusController.redeemPromoCode);

// Rakeback
router.get("/rakeback", authMiddleware, bonusController.getRakeback);
router.post("/rakeback/claim", authMiddleware, bonusController.claimRakeback);

// Tasks
router.get("/tasks", authMiddleware, bonusController.getTasks);
router.post("/tasks/claim", authMiddleware, bonusController.claimTask);

// Spin
router.get("/spin/status", authMiddleware, bonusController.getSpinStatus);
router.post("/spin/roll", authMiddleware, bonusController.rollSpin);

// Vault Pro
router.get("/vault/stats", authMiddleware, bonusController.getVaultStats);

module.exports = router;
