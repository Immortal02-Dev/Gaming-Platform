const express = require("express");
const router = express.Router();
const {
  getGames,
  getFeaturedGames,
  searchGames,
  getGameById,
  launchGame,
  getFavorites,
  getRecentGames,
} = require("../controllers/gameController");
const authMiddleware = require("../middleware/authMiddleware");

// @route   GET /api/games
// @desc    Get all games with optional filters, sort, and pagination
// @access  Public
// Example: /api/games?category=slots&sort=popular&page=1&limit=16
router.get("/", getGames);

// @route   GET /api/games/featured
// @desc    Get featured games for lobby sections
// @access  Public
// Example: /api/games/featured?section=originals
// sections: originals | hot | live | new
router.get("/featured", getFeaturedGames);

// @route   GET /api/games/favorites
// @desc    Get user's favorite games
// @access  Private
router.get("/favorites", authMiddleware, getFavorites);

// @route   GET /api/games/recent
// @desc    Get user's recent games
// @access  Private
router.get("/recent", authMiddleware, getRecentGames);

// @route   GET /api/games/search
// @desc    Search games by title
// @access  Public
// Example: /api/games/search?q=crash
router.get("/search", searchGames);

// @route   GET /api/games/:idOrSlug
// @desc    Get single game by ID or slug
// @access  Public
router.get("/:idOrSlug", getGameById);

// @route   POST /api/games/:idOrSlug/launch
// @desc    Create a game session (requires login)
// @access  Private
router.post("/:idOrSlug/launch", authMiddleware, launchGame);

module.exports = router;
