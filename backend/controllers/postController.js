const Post = require("../models/post")

const createPostController = async (req, res) => {
    // res.json({ message: 'create post' })
    const { body } = req.body
    if (!body) {
        return res.status(401).json({ message: 'please add some text first!' })
    }
    // console.log(req.user);
    // res.json({ message: 'create post' })
    const post = await new Post({
        body,
        author: req.user
    }).save()
    return res.status(200).json(post)
}

const getAllPosts = async (req, res) => {
    await Post.find()
        .populate('author', '_id name')
        .then(posts => {
            return res.json(posts)
        })
        .catch(error => res.status(401).json({ message: 'error while fetching all posts' }))
}

const getUserPosts = async (req, res) => {
    const posts = await Post.find({ author: req.user._id })
        .populate('author', '_id name')
    if (posts) {
        return res.status(200).json(posts)
    } else {
        return res.status(404).json({ message: 'no post available' })
    }
}

const singlepost = async (req, res) => {
    const post = await Post.findById(req.params.id)
    if (post) {
        return res.status(200).json(post)
    } else {
        return res.status(404).json({ message: 'error post not find.' })
    }
}

const deletepost = async (req, res) => {
    const post = await Post.findById(req.params.id)
    if (post) {
        await post.remove()
        return res.status(200).json({ message: 'post deleted' })
    } else {
        return res.status(404).json({ message: 'post not deleted.' })
    }
}

const likepost = async (req, res) => {
    const post = await Post.findByIdAndUpdate(req.body.id, { $push: { likes: req.user._id } }, { new: true })
    if (post) {
        res.status(200).json(post)
    } else {
        res.status(404).json({ message: 'error not found' })
    }

}

const unlikepost = async (req, res) => {
    const post = await Post.findByIdAndUpdate(req.body.id, { $pull: { likes: req.user._id } }, { new: true })
    if (post) {
        res.status(200).json(post)
    } else {
        res.status(404).json({ message: 'error not found' })
    }
}


module.exports = { createPostController, getAllPosts, getUserPosts, singlepost, deletepost, likepost, unlikepost }