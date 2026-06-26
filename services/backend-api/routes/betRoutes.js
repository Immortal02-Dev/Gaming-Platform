const express = require("express");
const router = express.Router();
const { getBetHistory, placeBet } = require("../controllers/betController");
const authMiddleware = require("../middleware/authMiddleware");

// All bet routes require authentication
router.use(authMiddleware);

// @route   GET /api/bets/history
// @desc    Get current user's bet history (filterable)
// @access  Private
// Example: /api/bets/history?category=slots&coin=BTC&period=7d&page=1
// period: 24h | 7d | 30d | 60d | 90d
router.get("/history", getBetHistory);

// @route   POST /api/bets/place
// @desc    Place a bet on a game
// @access  Private
// Body: { gameId, amount, currency }
router.post("/place", placeBet);

module.exports = router;
