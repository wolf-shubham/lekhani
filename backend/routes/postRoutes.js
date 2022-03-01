const express = require('express')
const { createPostController, getAllPosts, getUserPosts } = require('../controllers/postController')
const authMiddleware = require('../middlewares/authMiddleware')
const route = express()


route.post('/createpost', authMiddleware, createPostController)
route.get('/allposts', getAllPosts)
route.get('/userposts', authMiddleware, getUserPosts)

module.exports = route