const express = require("express");
const router = express.Router();
const lotteryController = require("../controllers/lotteryController");

// GET /api/lottery
router.get("/", lotteryController.getLotteries);

// GET /api/lottery/featured
router.get("/featured", lotteryController.getFeaturedLotteries);

// GET /api/lottery/:idOrSlug
router.get("/:idOrSlug", lotteryController.getLotteryById);

module.exports = router;
