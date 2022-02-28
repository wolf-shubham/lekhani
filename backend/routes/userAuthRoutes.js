const express = require('express')
const route = express()
const { registerController } = require('../controllers/userAuthControllers')

route.get('/login', (req, res) => {
    res.send({ message: 'login route' })
})

route.post('/register', registerController)

module.exports = route