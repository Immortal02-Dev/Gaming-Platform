const express = require("express");
const router = express.Router();
const chatController = require("../controllers/admin/chatController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/messages", chatController.getPublicMessages);
router.post("/messages", authMiddleware, chatController.sendPublicMessage);

module.exports = router;
