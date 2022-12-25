const express = require('express')
const router = express.Router()
const UserController =  require('../controllers/user.controller')

router.post('/login', UserController.userLogin)
router.post('/user', UserController.createUser)

module.exports = router