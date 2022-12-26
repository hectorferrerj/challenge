const HttpError = require("../helpers/http-error")
const Recipient = require("../models/recipient.model")

class RecipientController {
  async createRecipient(req, res, next) {
    let recipientCreated
    const { name, lastName, email, newsletters } = req.body
    try {
      let recipientExists = await Recipient.findOne({ email: email })

      if (recipientExists) {
        const userExistsError = new HttpError(
          "Recipient email already exists",
          409
        )
        return next(userExistsError)
      }
    } catch {
      const recipientFindError = new HttpError("Recipient search error", 500)
      return next(recipientFindError)
    }

    recipientCreated = new Recipient({
      name,
      lastName,
      email,
      newsletters: newsletters || []
    })
    try {
      await recipientCreated.save()
    } catch (err) {
      const recipientSaveError = new HttpError(
        "Create recipient failed " + err,
        500
      )
      return next(recipientSaveError)
    }

    return res.status(200).json({
      data: recipientCreated,
    })
  }

  async createMassiveRecipient(req, res, next) {
    let recipientCreated = []
    let recipientSchema
    const { recipients } = req.body

    console.log('Recipients', recipients)

    try {
      let recipientsDuplicated = []

      for (let recipient of recipients) {
        let recipientFound = await Recipient.findOne({ email: recipient.email })
        console.log('RecipientsFound', recipientFound);
        if (recipientFound) recipientsDuplicated.push(recipientFound.email)
      }

      if (recipientsDuplicated.length) {
        const userExistsError = new HttpError(
          "The following recipients emails already exists" +
            recipientsDuplicated.join(" , "),
          409
        )
        return next(userExistsError)
      }
    } catch {
      const recipientFindError = new HttpError("Recipient search error", 500)
      return next(recipientFindError)
    }

    for (let recipientToSave of recipients) {
      recipientSchema = new Recipient({
        name: recipientToSave.name,
        lastName: recipientToSave.lastName,
        email: recipientToSave.email,
        newsletters: recipientToSave.newsletters || []
      })

      try {
        await recipientSchema.save()
        recipientCreated.push(recipientSchema)
      } catch (err) {
        const recipientSaveError = new HttpError(
          "Create recipients failed " + err,
          500
        )
        return next(recipientSaveError)
      }
    }

    return res.status(200).json({
      data: recipientCreated,
    })
  }

  async getRecipient(req, res, next) {
    try {
      const recipients = await Recipient.find()
      return res.status(200).json({
        recipients,
      })
    } catch (err) {
      const recipientError = new HttpError("Get recipients failed " + err, 500)
      return next(recipientError)
    }
  }

  async addRecipientNewsletter(req, res, next) {
    const { _id, newsletter } = req.body
    try {
      let recipientUpdate = await Recipient.updateOne(
        { _id},
        { $push: { newsletters: newsletter } }
      )
      return res.status(200).json({
        data: recipientUpdate,
      })
      
    } catch (error) {
      const recipientUpdateError = new HttpError("Update recipient failed " + error, 500)
      return next(recipientUpdateError)
    }
  }

  async unsubscribe(req, res, next) {
    const { _id, newsletter_oid } = req.query
    try {
      let recipientUpdate = await Recipient.updateOne(
        { _id, "newsletters.newsletter_oid": newsletter_oid },
        { $set: { "newsletters.$.isSubscribe": false } }
      )
      return res.status(200).json({
        data: recipientUpdate,
      })
      
    } catch (error) {
      const recipientUpdateError = new HttpError("Update recipient failed " + error, 500)
      return next(recipientUpdateError)
    }
  }
}

module.exports = new RecipientController()
