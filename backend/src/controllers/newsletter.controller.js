const HttpError = require("../helpers/http-error")
const Newsletter = require("../models/newsletter.model")
const Mailer = require("../helpers/mailer")

class NewsletterController {
  async create(req, res, next) {
    let newsletterCreated
    const { name } = req.body

    try {
      newsletterCreated = new Newsletter({
        name
      })
      await newsletterCreated.save()

      return res.status(200).json({
        data: newsletterCreated,
      })
    } catch (error) {
      const newsletterError = new HttpError("Newsletter creation error " + error, 500)
      return next(newsletterError)
    }
  }

  async sendMails(req, res, next) {
    const { newsletter, recipients } = req.body
    await Mailer.sendMails(newsletter, recipients).then((mails)=> {
      return res.status(200).json({
        data: mails
      })
    }).catch((error)=> {
      const sendMailsError = new HttpError("Error sending mails " + error, 500)
      return next(sendMailsError)
    })
  }
}

module.exports = new NewsletterController()