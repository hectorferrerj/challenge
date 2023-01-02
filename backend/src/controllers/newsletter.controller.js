const HttpError = require("../helpers/http-error")
const Newsletter = require("../models/newsletter.model")
const Mailer = require("../helpers/mailer")

class NewsletterController {
  async create(req, res, next) {
    let newsletterCreated
    const { name } = req.body

    try {
      newsletterCreated = new Newsletter({
        name,
      })
      await newsletterCreated.save()

      return res.status(200).json(newsletterCreated)
    } catch (error) {
      const newsletterError = new HttpError(
        "Newsletter creation error " + error,
        500
      )
      return next(newsletterError)
    }
  }

  async getNewsletters(req, res, next) {
    try {
      const newsletters = await Newsletter.find()
      return res.status(200).json(newsletters)
    } catch (err) {
      const newsletterError = new HttpError(
        "Get newsletters failed " + err,
        500
      )
      return next(newsletterError)
    }
  }

  async getNewslettersByName(req, res, next) {
    try {
      const { filenames } = req.body
      let names = filenames.map((item) => item.filename)
      const newsletters = await Newsletter.find({ name: { $in: names } })
      const newsletters_id = newsletters.map(item => { return {newsletter_oid: item._id}})
      return res.status(200).json(newsletters_id)
    } catch (err) {
      const newsletterError = new HttpError(
        "Get newsletters failed " + err,
        500
      )
      return next(newsletterError)
    }
  }

  async sendMails(req, res, next) {
    const { newsletter, recipients, unsubscribeOid } = req.body
    await Mailer.sendMails(newsletter, recipients, unsubscribeOid)
      .then((mails) => {
        return res.status(200).json({
          data: mails,
        })
      })
      .catch((error) => {
        const sendMailsError = new HttpError(
          "Error sending mails " + error,
          500
        )
        return next(sendMailsError)
      })
  }
}

module.exports = new NewsletterController()
