const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address'] 
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female", "non-binary"]
    },
    profilePicture: {
        type: String,
        required: true,
        default: ""
    },
    bio: {
        type: String,
        required: true,
        default: ""
    },
    interests: {
        type: [String],
        required: true,
        default: []
    },
    knownLanguages: {
        type: [String],
        required: true
    },
    targetLanguages: {
        type: [String],
        required: true
    },
    matches: {
        type: [mongoose.Schema.ObjectId],
        required: true,
        default: []
    } ,
    rooms: {
        type: [mongoose.Schema.ObjectId],
        required: true,
        default: []
    }
});

module.exports = mongoose.model('User', UserSchema);