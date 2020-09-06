const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
        lowercase: true
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    role: {
        type: String,
        default: 'basic',
        enum: ["basic", "shop_owner", "admin"]
    },
    enabled: {
        type: Boolean,
        default: false,
        lowercase: true
    }
    ,
    accessToken: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', User);