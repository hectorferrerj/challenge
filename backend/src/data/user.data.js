const User = require("../models/user.model")

class UserData {
  async getUser() {
    try {
      const user = await User.find()
      return user
    } catch (e) {
      console.info("Error on get user")
    }
  }

  async createUser(req) {
    let userExists
    const { name, lastName, email, password, isAdmin } = req.body

    try {
      userExists = await User.findOne({ email: email })
      if (userExists) {
        throw new Error(' "A user with email or username already exists"')
      }
    } catch {
      throw new Error("Error on get user")
    }

    const userSchema = new User({
      name: name,
      lastName: lastName,
      email: email,
      password: password,
      isAdmin: isAdmin,
    })

    try {
      await userSchema.save()
    } catch {
      throw new Error("Create user failed, try again")
    }

    return userSchema
  }
}

module.exports = new UserData()
