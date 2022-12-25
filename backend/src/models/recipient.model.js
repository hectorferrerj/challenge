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
    newsletters: {
      type: Array,
      isSubscribe: { type: Boolean },
      name: { type: String },
      required: false,
      default: [],
    },
  },
  { collection: "recipients" }
)

module.exports = mongoose.model("Recipient", recipientSchema)
