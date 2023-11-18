const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const TicketSchema = new Schema({

    // user can only see their tickets
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
    }
});

// ticket will expire in 3 days
TicketSchema.index({ createdAt: 1 }, { expireAfterSeconds: (3 * 24 * 60 * 60) });

module.exports = mongoose.model('Ticket', TicketSchema)