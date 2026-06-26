const express = require("express");
const router = express.Router();
const { getSports, getMatches } = require("../controllers/sportController");

// @route   GET /api/sports
// @desc    Get all sports categories
// @access  Public
router.get("/", getSports);

// @route   GET /api/sports/matches
// @desc    Get matches by type (popular|live|upcoming) and sport
// @access  Public
// Example: /api/sports/matches?type=live&sportSlug=soccer
router.get("/matches", getMatches);

module.exports = router;
