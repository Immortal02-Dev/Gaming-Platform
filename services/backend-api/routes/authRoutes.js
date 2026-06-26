const express = require("express");
const {
  register,
  login,
  getUser,
  logout,
} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
router.post("/register", register);

// @route   POST /api/auth/login
// @desc    Login a user
router.post("/login", login);

// @route   GET /api/auth/user
// @desc    Get current user
router.get("/user", authMiddleware, getUser);

// @route   POST /api/auth/logout
// @desc    Logout user
router.post("/logout", authMiddleware, logout);

module.exports = router;
