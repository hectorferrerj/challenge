const express = require("express")
const router = express.Router()
const NewsletterController = require("../controllers/newsletter.controller")

router.get("/newsletter", NewsletterController.getNewsletters)
router.post("/newsletter", NewsletterController.create)
router.post("/email", NewsletterController.sendMails)
router.post("/newsletter-filename", NewsletterController.getNewslettersByName);

module.exports = router
