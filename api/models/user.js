/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');

// create user schema
const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        profilepic: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true,
    },
);

// create user model
const User = mongoose.model('User', UserSchema);

module.exports = User;
