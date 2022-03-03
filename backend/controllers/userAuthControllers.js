const bcrypt = require('bcrypt')
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
    if (!user) {
        return res.status(404).json({ message: 'Invalid Email or Password' })
    }
    const comparePassword = await bcrypt.compare(password, user.password)
    if (!comparePassword) {
        return res.status(404).json({ message: 'Invalid Email or Password' })
    }
    const token = generateToken(user._id)
    return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        displaypic: user.displaypic,
        followers: user.followers,
        following: user.following,
        token, message: "successful login"
    })
}

const followAndUnfollowUser = async (req, res) => {
    try {
        const userToFollow = await User.findById(req.body.id)
        const loggedUser = await User.findById(req.user._id)
        console.log(loggedUser);
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


module.exports = { registerController, loginController, followAndUnfollowUser }