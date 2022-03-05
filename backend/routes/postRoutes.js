const express = require('express')
const { createPostController, getAllPosts, getUserPosts, singlepost, deletepost, likeAndUnlikePost, deletePost } = require('../controllers/postController')
const authMiddleware = require('../middlewares/authMiddleware')
const route = express()


route.post('/createpost', authMiddleware, createPostController)
route.get('/allposts', getAllPosts)
route.get('/userposts', authMiddleware, getUserPosts)
route.get('/:id', singlepost)
route.delete('/:id', authMiddleware, deletepost)
route.put('/likepost', authMiddleware, likeAndUnlikePost)



module.exports = route