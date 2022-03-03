const Post = require("../models/post")
const User = require("../models/userModel")
// const User = require("../models/userModel")

const createPostController = async (req, res) => {
    const { body } = req.body
    if (!body) {
        return res.status(401).json({ message: 'please add some text first!' })
    }
    // console.log(req.user);
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

const likeAndUnlikePost = async (req, res) => {
    try {
        const post = await Post.findById(req.body.id)
        if (post.likes.includes(req.user._id)) {
            const index = post.likes.indexOf(req.user._id)
            post.likes.splice(index, 1)
            await post.save()
            return res.status(200).json({ message: 'post unliked' })
        }
        post.likes.push(req.user._id)
        await post.save()
    } catch (error) {
        res.status(500).json({ message: 'error while liking' })
    }

}

const getfollowingposts = async (req, res) => {
    try {
        const user = await User.find(req.user._id)
        console.log(user);

        return res.status(200).json(user)
    } catch (error) {
        return res.status(404).json({ message: 'no post available' })

    }

}


module.exports = { createPostController, getAllPosts, getUserPosts, singlepost, deletepost, likeAndUnlikePost, getfollowingposts }