const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const WMSchema = new Schema({

    status: {
        type: String,
        enum: ['Available', 'In use'],
        default: 'Available',
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('WashingMachine', WMSchema)