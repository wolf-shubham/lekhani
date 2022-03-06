const Post = require("../models/post")
const User = require("../models/userModel")

const createPostController = async (req, res) => {
    const { body } = req.body
    if (!body) {
        return res.status(401).json({ message: 'please add some text first!' })
    }
    // console.log(req.user);
    const post = await new Post({
        body,
        author: req.user._id
    }).save()

    const user = await User.findById(req.user._id)
    user.userposts.push(post._id)
    await user.save()
    return res.status(200).json(post)
}

// const getAllPosts = async (req, res) => {
//     await Post.find()
//         .populate('author', '_id name')
//         .then(posts => {
//             return res.json(posts)
//         })
//         .catch(error => res.status(401).json({ message: 'error while fetching all posts', error }))
// }

const getUserPosts = async (req, res) => {
    try {
        const posts = await Post.find({ author: req.user._id })
            .populate('author', '_id name')
        if (posts) {
            return res.status(200).json(posts)
        } else {
            return res.status(404).json({ message: 'no post available' })
        }
    } catch (error) {
        res.status(404).json({ message: 'user not found' })
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
    if (!post) {
        return res.status(404).json({
            message: "Post not found",
        });
    }
    if (post) {
        await post.remove()
        return res.status(200).json({ message: 'post deleted' })
    } else {
        return res.status(404).json({ message: 'post not deleted.' })
    }
}

const likeAndUnlikePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (post.likes.includes(req.user._id)) {
            const index = post.likes.indexOf(req.user._id)
            post.likes.splice(index, 1)
            await post.save()
            return res.status(200).json({ message: 'post unliked' })
        }
        post.likes.push(req.user._id)
        await post.save()
        return res.status(200).json({ message: 'post liked' })
    } catch (error) {
        res.status(500).json({ message: 'error while liking' })
    }

}


// const  = async (req, res) => {
//     try {
//         const user = await User.findById(req.user._id.toString())
//         console.log(user);
//         return res.status(200).json(user)
//     } catch (error) {
//         return res.status(404).json({ message: 'no post available' })

//     }

// }

const addComment = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            return res.status(404).json({ message: 'post not found' })
        }

        const comment = {
            text: req.body.comment,
            commentPostedBy: req.user._id
        }

        Post.findByIdAndUpdate(req.params.id, {
            $push: { comments: comment }
        }, { new: true })
            // .populate("comments.commentPostedBy", "_id name")
            .exec((err, result) => {
                if (err) {
                    return res.status(422).json({ error: err })
                } else {
                    return res.json(result)
                }
            })
    } catch (error) {
        res.status(401).json({ message: 'comment add fail.' })
    }
}

module.exports = { createPostController, getUserPosts, singlepost, deletepost, likeAndUnlikePost, addComment }