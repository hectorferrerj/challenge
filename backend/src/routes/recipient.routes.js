const express = require("express")
const router = express.Router()
const RecipientController = require("../controllers/recipient.controller")

router.get("/recipients", RecipientController.getRecipient)
router.post("/recipient", RecipientController.createRecipient)
router.post("/recipients", RecipientController.createMassiveRecipient)
router.put("/recipient-newsletter", RecipientController.addRecipientNewsletter)
router.put("/recipient-unsubscribe", RecipientController.unsubscribe)

module.exports = router
