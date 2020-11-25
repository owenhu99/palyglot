const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    participants: {
        type: [String],
        required: true,
        default: []
    },
    messages: {
        type: [{
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
                type: String,
                required: true
            },
            to: {
                type: String,
                required: true
            }
        }],
        required: false,
        default: []
    }
});

module.exports = mongoose.model('Room', RoomSchema);