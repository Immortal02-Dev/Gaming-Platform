const express = require("express");
const router = express.Router();
const questController = require("../controllers/questController");
const authMiddleware = require("../middleware/authMiddleware");

// PUBLIC
router.get("/", questController.getQuests);
router.get("/meta", questController.getQuestMeta);

// PROTECTED
router.get("/my-progress", authMiddleware, questController.getMyProgress);
router.get("/stats", authMiddleware, questController.getQuestStats);
router.get("/history", authMiddleware, questController.getQuestHistory);
router.post("/:id/claim", authMiddleware, questController.claimQuest);

module.exports = router;
