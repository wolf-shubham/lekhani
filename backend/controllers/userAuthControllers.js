const bcrypt = require('bcrypt')
const User = require("../models/userModel")

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

module.exports = { registerController }