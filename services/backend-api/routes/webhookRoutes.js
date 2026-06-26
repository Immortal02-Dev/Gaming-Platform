const express = require("express");
const router = express.Router();
const webhookController = require("../controllers/webhookController");

// Public endpoints for payment provider callbacks
router.post("/:provider", webhookController.handleWebhook);
router.get("/:provider", webhookController.handleWebhook); // some providers use GET for verification

module.exports = router;
