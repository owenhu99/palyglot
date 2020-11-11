const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    participants: {
        type: [mongoose.Schema.ObjectId],
        required: true
    }
});

module.exports = mongoose.model('Room', RoomSchema);