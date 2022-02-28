const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const postSchema = mongoose.Schema({
    body: { type: String, required: true },
    likes: [{ type: ObjectId, ref: 'User' }],
    comments: [{ text: String, commentPostedBy: { type: ObjectId, ref: 'User' } }],
    author: { type: ObjectId, ref: 'User' }
}, { timestamps: true })

module.exports = mongoose.model('Post', postSchema)