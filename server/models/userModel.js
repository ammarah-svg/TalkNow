const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter username']
    },
    email: {
        type: String,
        required: [true, 'Please enter email'],
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter password']
    },
    avatar: {
        type: String,
        required: false,
        default: null
    },
    about: {
        type: String,
        required: false,
        default: "Hey there, I'm using Whatsapp👋"
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);