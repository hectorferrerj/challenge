const UserData = require("../data/user.data")

class UserController {
  async getUser(req, res) {
    return await UserData.getUser()
      .then((user) => {
        return res.status(200).json({
          data: user,
        })
      })
      .catch((e)=> console.log(e));
  }

  async createUser(req, res) {
    return await UserData.createUser(req)
      .then((user) => {
        return res.status(200).json({
          data: user,
        })
      })
      .catch((e)=> console.log(e));
  }
}

module.exports = new UserController()
