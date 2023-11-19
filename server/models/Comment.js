const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    announcement: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Announcement',
    },
    text: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
      },
  });
  
  module.exports = mongoose.model('Comment', CommentSchema);