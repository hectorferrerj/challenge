const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
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
      unique: true
    },

    password: {
      type: String,
      required: true,
      minLength: 8,
    },

    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { collection: "users" }
)

module.exports = mongoose.model("User", UserSchema)
