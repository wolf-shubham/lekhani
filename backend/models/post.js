const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    body: { type: String, required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{
        text: String,
        commentPostedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    }],
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
}, { timestamps: true })

module.exports = mongoose.model('Post', postSchema)

