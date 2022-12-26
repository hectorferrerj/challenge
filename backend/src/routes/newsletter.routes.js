const express = require("express")
const router = express.Router()
const NewsletterController = require("../controllers/newsletter.controller")

router.post("/newsletter", NewsletterController.create)
router.post("/email", NewsletterController.sendMails)

module.exports = router
