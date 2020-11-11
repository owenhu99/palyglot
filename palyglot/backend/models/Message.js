const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    from: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    to: {
        type: mongoose.Schema.ObjectId,
        required: true
    }
});

module.exports = mongoose.model('Message', MessageSchema);