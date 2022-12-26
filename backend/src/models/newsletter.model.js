const mongoose = require("mongoose")

const newsletterSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    }
  },
  { collection: "newsletters" }
)

module.exports = mongoose.model("Newsletter", newsletterSchema)
