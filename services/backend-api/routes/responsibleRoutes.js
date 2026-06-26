const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const ctrl = require("../controllers/responsibleGamblingController");

// All routes require authentication
router.use(authMiddleware);

router.get("/exclusion", ctrl.getMyExclusion);
router.post("/exclusion", ctrl.submitExclusion);
router.get("/limits", ctrl.getMyLimits);
router.post("/limits", ctrl.setLimits);

module.exports = router;
