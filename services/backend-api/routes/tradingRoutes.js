const express = require("express");
const router = express.Router();
const tradingController = require("../controllers/tradingController");
const authMiddleware = require("../middleware/authMiddleware");

// ── Public Routes ─────────────────────────────────────────────────────
router.get("/markets", tradingController.getMarkets);
router.get("/price/:symbol", tradingController.getPriceHistory);
router.get("/stats", tradingController.getTradingStats);
router.get("/live-feed", tradingController.getLiveFeed);
router.get("/leaderboard", tradingController.getLeaderboard);
router.get("/rounds/:market_symbol", tradingController.getRounds);
router.get("/sentiment/:symbol", tradingController.getSentiment);
router.get("/trades/:symbol", tradingController.getTradesBySymbol);

// ── Protected Routes (JWT required) ───────────────────────────────────
router.use(authMiddleware);
router.post("/trade", tradingController.placeTrade);
router.patch("/trade/:id", tradingController.updateTrade);
router.post("/trade/:id/close", tradingController.closeTrade);
router.get("/positions", tradingController.getPositions);
router.get("/history", tradingController.getTradeHistory);

module.exports = router;
