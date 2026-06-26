const express = require("express");
const router = express.Router();
const swapController = require("../controllers/swapController");
const authMiddleware = require("../middleware/authMiddleware");

// PUBLIC ROUTES
router.get("/rates", swapController.getSwapRates);

// PROTECTED ROUTES
router.post("/execute", authMiddleware, swapController.executeSwap);

module.exports = router;
