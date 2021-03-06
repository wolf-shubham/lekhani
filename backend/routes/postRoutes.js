const express = require('express')
const { createPostController, getUserPosts, singlepost, deletepost, likeAndUnlikePost, addComment } = require('../controllers/postController')
const authMiddleware = require('../middlewares/authMiddleware')
const route = express()


route.post('/createpost', authMiddleware, createPostController)
// route.get('/allposts', getAllPosts)
route.get('/userposts', authMiddleware, getUserPosts)
route.get('/:id', singlepost)
route.delete('/:id', authMiddleware, deletepost)
route.get('/likepost/:id', authMiddleware, likeAndUnlikePost)
route.post('/comment/:id', authMiddleware, addComment)



module.exports = route