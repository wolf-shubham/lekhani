const express = require('express')
const route = express()
const { registerController, loginController, followAndUnfollowUser, qwerty, followingPosts, deleteUserprofile, getProfile, getUserProfile, getAllUsers } = require('../controllers/userAuthControllers')
const authMiddleware = require('../middlewares/authMiddleware')

route.post('/login', loginController)

route.post('/register', registerController)

route.put('/followuser', authMiddleware, followAndUnfollowUser)

route.get('/test', authMiddleware, qwerty)

route.get('/followingposts', authMiddleware, followingPosts)

route.delete('/deleteprofile', authMiddleware, deleteUserprofile)

route.get('/profile', authMiddleware, getProfile)

route.get('/allusers', getAllUsers)

route.get('/:id', authMiddleware, getUserProfile)



module.exports = route