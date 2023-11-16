const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const TicketSchema = new Schema({

    status: {
        type: Boolean,
        default: false
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Ticket', TicketSchema)