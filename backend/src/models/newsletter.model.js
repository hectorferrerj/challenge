const mongoose = require("mongoose")

const newsletterSchema = mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    extension: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  { collection: "newsletters" }
)

module.exports = mongoose.model("Newsletter", newsletterSchema)
