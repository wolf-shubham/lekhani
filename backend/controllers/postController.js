const Post = require("../models/post")

const createPostController = async (req, res) => {
    // res.json({ message: 'create post' })
    const { body } = req.body
    if (!body) {
        return res.status(401).json({ message: 'please add some text first!' })
    }
    console.log(req.user);
    // res.json({ message: 'create post' })
    const post = await new Post({
        body,
        author: req.user
    }).save()
    res.status(200).json({ post })
}

const getAllPosts = async (req, res) => {
    await Post.find()
        .populate('author', '_id name')
        .then(posts => {
            res.json(posts)
        })
        .catch(error => res.status(401).json({ message: 'error while fetching all posts' }))
}

const getUserPosts = async (req, res) => {
    const posts = await Post.find({ author: req.user._id })
        .populate('author', '_id name')
    if (posts) {
        res.status(200).json({ posts })
    } else {
        res.status(404).json({ message: 'no post available' })
    }
}
module.exports = { createPostController, getAllPosts, getUserPosts }