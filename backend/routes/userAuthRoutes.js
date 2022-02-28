const express = require('express')
const route = express()
const { registerController, loginController } = require('../controllers/userAuthControllers')

route.post('/login', loginController)

route.post('/register', registerController)

module.exports = route