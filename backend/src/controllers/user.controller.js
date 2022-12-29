const HttpError = require("../helpers/http-error")
const User = require("../models/user.model")

class UserController {
  async userLogin(req, res, next) {
    const { email, password } = req.body
  
    try {
      const user = await User.find({ email, password })
      if (!user.length) {
        const httpError = new HttpError("Invalid user or password", 401)
        return next(httpError)
      }
      let userFound = user.shift();
      userFound['password'] = '';
      
      return res.status(200).json({
        data: userFound,
      })
    } catch (e) {
      const error = new HttpError("Error on get user", 500)
      return next(error)
    }
  }

  async createUser(req, res, next) {
    let userExists
    let userCreated
    const { name, lastName, email, password, isAdmin } = req.body
    try {
      userExists = await User.findOne({ email: email })
      console.log("User", userExists)

      if (userExists) {
        const userExistsError = new HttpError("User email already exists", 409)
        return next(userExistsError)
      }
    } catch {
      const userFindError = new HttpError("User search error", 500)
      return next(userFindError)
    }

    userCreated = new User({
      name,
      lastName,
      email,
      password,
      isAdmin,
    })
    try {
      await userCreated.save()
    } catch (err) {
      const userSaveError = new HttpError("Create user failed " + err, 500)
      return next(userSaveError)
    }

    return res.status(200).json({
      data: userCreated,
    })
  }
}

module.exports = new UserController()
