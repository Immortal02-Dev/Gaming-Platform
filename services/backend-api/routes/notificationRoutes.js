const express = require("express");
const router = express.Router();
const notificationController = require("../controllers/notificationController");
const authMiddleware = require("../middleware/authMiddleware");

// Apply auth middleware to all routes
router.use(authMiddleware);

// User endpoints
router.get("/", notificationController.getUserNotifications);
router.put("/:id/read", notificationController.markAsRead);

module.exports = router;
