const express = require("express");
const router = express.Router();
const {
  getProviders,
  getGamesByProvider,
} = require("../controllers/providerController");

// @route   GET /api/providers
// @desc    Get all game providers
// @access  Public
router.get("/", getProviders);

// @route   GET /api/providers/:slug/games
// @desc    Get all games offered by a specific provider
// @access  Public
// Example: /api/providers/pragmatic-play/games?sort=popular&page=1&limit=16
router.get("/:slug/games", getGamesByProvider);

module.exports = router;
