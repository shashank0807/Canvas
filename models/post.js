const mongoose = require ('mongoose');

const postSchema = mongoose.Schema({
    user: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'user'
        },
    date: {
            type: Date,
            default: Date.now
    },
    content: String,
    likes: [ // An array containing user Ids of Users who liked the post
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    ]
})

module.exports = mongoose.model('post', postSchema);
