const express = require("express");
const router = express.Router();
const sponsorshipController = require("../controllers/sponsorshipController");

router.get("/", sponsorshipController.getSponsorships);
router.get("/:slug", sponsorshipController.getSponsorshipBySlug);

module.exports = router;
