const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address'] 
    },
    userId: {
        type: String,
        required: true,
        unique: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: false
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female", "Non-Binary"]
    },
    profilePicture: {
        type: String,
        required: false,
        default: "https://i.stack.imgur.com/34AD2.jpg"
    },
    bio: {
        type: String,
        required: false,
        default: ""
    },
    interests: {
        type: String,
        required: false,
        default: ""
    },
    knownLanguages: {
        type: [String],
        required: false,
        default: []
    },
    targetLanguages: {
        type: [String],
        required: false,
        default: []
    },
    rooms: {
        type: [String],
        required: false,
        default: []
    } ,
    sentMatches: {
        type: [String],
        required: false,
        default: []
    } ,
    matchInvites : {
        type: [String],
        required: false,
        default: []
    } ,
    matches : {
        type: [String],
        required: false,
        default: []
    }
});

UserSchema.pre('save', async function (next) {
    // Hashing password before saving the user model
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

UserSchema.methods.generateAuthToken = async function() {
    // Generate an auth token for the user
    const user = this
    const token = jwt.sign({_id: user._id}, process.env.JWT_KEY)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

UserSchema.statics.findByCredentials = async (email, password) => {
    // Search for a user by email and password
    const user = await User.findOne({email})
    if (!user) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {
        throw new Error({ error: 'Invalid login credentials' })
    }
    return user
}

const User = mongoose.model('User', UserSchema)

module.exports = User

/**
 * Source citation:
 * https://medium.com/swlh/jwt-authentication-authorization-in-nodejs-express
 * -mongodb-rest-apis-2019-ad14ec818122
 */