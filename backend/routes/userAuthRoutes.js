const express = require('express')
const route = express()
const { registerController, loginController, followAndUnfollowUser } = require('../controllers/userAuthControllers')
const authMiddleware = require('../middlewares/authMiddleware')

route.post('/login', loginController)

route.post('/register', registerController)

route.put('/followuser', authMiddleware, followAndUnfollowUser)

module.exports = route