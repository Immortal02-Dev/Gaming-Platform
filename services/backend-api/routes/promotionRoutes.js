const express = require("express");
const router = express.Router();
const promotionController = require("../controllers/promotionController");
const authMiddleware = require("../middleware/authMiddleware");

// GET /api/promotions
router.get("/", promotionController.getPromotions);

// GET /api/promotions/:slug
router.get("/:slug", promotionController.getPromotionBySlug);

// Daily Contest Routes
router.get("/daily-contest", promotionController.getDailyContest);
router.get("/daily-contest/my-stats", authMiddleware, promotionController.getMyDailyContestStats);

// Weekly Raffle Routes
router.get("/weekly-raffle", promotionController.getWeeklyRaffle);
router.get("/weekly-raffle/my-tickets", authMiddleware, promotionController.getMyWeeklyRaffleTickets);

module.exports = router;
