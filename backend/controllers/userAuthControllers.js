const bcrypt = require('bcrypt')
const Post = require('../models/post')
const User = require("../models/userModel")
const generateToken = require('../utils/generateToken')

const registerController = async (req, res) => {
    const { name, email, password, displaypic } = req.body
    const findUser = await User.findOne({ email })
    if (findUser) {
        return res.status(400).json({ message: 'user with that email already exists.' })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await new User({
        name,
        email,
        password: hashedPassword,
        displaypic
    }).save()
    res.status(200).json(newUser)

}


const loginController = async (req, res) => {
    const { email, password } = req.body
    const user = await User.findOne({ email })
        .populate('userposts following followers')
    if (!user) {
        return res.status(404).json({ message: 'Invalid Email or Password' })
    }
    const comparePassword = await bcrypt.compare(password, user.password)
    if (!comparePassword) {
        return res.status(404).json({ message: 'Invalid Email or Password' })
    }
    // console.log(user);
    const token = generateToken(user._id)
    return res.status(200).json({
        // _id: user._id,
        // name: user.name,
        // email: user.email,
        // displaypic: user.displaypic,
        // followers: user.followers,
        // following: user.following,
        user,
        token, message: "successful login"
    })
}

const followAndUnfollowUser = async (req, res) => {
    try {
        const userToFollow = await User.findById(req.body.id)
        const loggedUser = await User.findById(req.user._id)
        const loggeduserid = (loggedUser._id).valueOf();
        const usertofollowid = (userToFollow._id).valueOf();
        if (loggeduserid === usertofollowid) {
            return res.status(400).json({ message: 'cannot follow self' })
        }
        if (!userToFollow) {
            return res.status(404).json({ message: 'user not found' })
        }

        if (loggedUser.following.includes(userToFollow._id)) {
            const indexOfFollowing = loggedUser.following.indexOf(userToFollow._id);
            const indexOfFollowers = userToFollow.followers.indexOf(loggedUser._id);

            loggedUser.following.splice(indexOfFollowing, 1);
            userToFollow.followers.splice(indexOfFollowers, 1);

            await loggedUser.save();
            await userToFollow.save();

            return res.status(200).json({
                success: true,
                message: "User Unfollowed",
            });
        } else {
            loggedUser.following.push(userToFollow._id)
            userToFollow.followers.push(loggedUser._id)

            await loggedUser.save()
            await userToFollow.save()

            return res.status(200).json({ message: 'user followed' })
        }

    } catch (error) {
        return res.status(404).json({ message: 'cannot follow user' })
    }
}

const qwerty = async (req, res) => {
    try {
        console.log(req.user._id);
        const user = await User.findById(req.user._id)
        // console.log(user)
        return res.status(200).json({ user })
    } catch (error) {
        return res.status(404).json({ message: 'error' })
    }
}

const followingPosts = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        const posts = await Post.find({
            author: {
                $in: user.following
            }
        }).populate('author likes comments.commentPostedBy', '-password -followers -following')
        // const test = posts.author.toString()
        res.status(200).json({ posts: posts.reverse() })
    } catch (error) {
        res.status(404).json({ message: 'error not find' })
    }
}

const deleteUserprofile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        const posts = user.userposts
        await user.remove()
        for (let i = 0; i < posts.length; i++) {
            const post = await Post.findById(posts[i])
            await post.remove()
        }
        return res.status(200).json({ message: 'user profile deleted' })
    } catch (error) {
        return res.status(400).json({ message: 'user not registered' })
    }
}

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .populate("userposts followers following")
        res.status(200).json({ user })
    } catch (error) {
        return res.status(400).json({ message: 'can not access user profile' })
    }
}

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        // .populate("userposts followers following")
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        return res.status(200).json(user)
    } catch (error) {
        return res.status(400).json({ message: 'can not access user profile' })
    }
}

const getAllUsers = async (req, res) => {
    await User.find()
        .select('-password')
        .then(users => {
            return res.json(users)
        })
        .catch(error => res.status(401).json({ message: 'error while fetching all posts', error }))
}


module.exports = { registerController, loginController, followAndUnfollowUser, qwerty, followingPosts, deleteUserprofile, getProfile, getUserProfile, getAllUsers }