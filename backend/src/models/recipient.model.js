const mongoose = require("mongoose")

const recipientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxLength: 50,
      minLength: 3,
    },
    lastName: {
      type: String,
      required: true,
      maxLength: 50,
      minLength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    newsletters: [{
      isSubscribe: { type: Boolean, default: true },
      newsletter_oid: { type: String },
    }],
  },
  { collection: "recipients" }
)

module.exports = mongoose.model("Recipient", recipientSchema)
