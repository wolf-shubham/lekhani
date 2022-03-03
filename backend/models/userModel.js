const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        displaypic: {
            type: String,
            default: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'
        },
        followers: [{
            type: ObjectId,
            ref: "User"
        }],
        following: [{
            type: ObjectId,
            ref: "User"
        }],
        userposts: [{ type: ObjectId, ref: "Post" }],

    }
)

const User = mongoose.model('User', userSchema)

module.exports = User