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
        token, message: "successful login"
    })
}

module.exports = { registerController, loginController }