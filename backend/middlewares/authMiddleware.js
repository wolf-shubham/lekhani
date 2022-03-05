const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const authMiddleware = async (req, res, next) => {
    let token
    if (
        req.headers.authorization && req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_KEY)
            // console.log(decoded)
            req.user = await User.findById(decoded.id).select('-password')
            // console.log(typeof (req.user));
            // console.log(req.user._id);
            next()
        } catch (error) {
            res.status(404).json(error)
        }
    }
}

module.exports = authMiddleware