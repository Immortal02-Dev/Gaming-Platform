const express = require("express");
const router = express.Router();
const vipController = require("../controllers/vipController");
const miscController = require("../controllers/admin/miscController");

// GET /api/vip
router.get("/", vipController.getVipInfo);

// GET /api/vip/levels
router.get("/levels", miscController.getVipLevels);

// GET /api/vip/benefits
router.get("/benefits", vipController.getVipBenefits);

// GET /api/vip/faqs
router.get("/faqs", vipController.getVipFaqs);

module.exports = router;
