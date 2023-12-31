const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const AnnSchema = new Schema({
    // owner can update/delete announcements
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment',
    }],
});

module.exports = mongoose.model('Announcement', AnnSchema);