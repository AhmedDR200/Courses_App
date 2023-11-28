const mongoose = require('mongoose');
const validator = require('validator');
const userRoles = require('../utils/roles');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate:[validator.isEmail, 'Filed must be a valid email'],
        minlength: 3,
        maxlength: 30
    },
    password: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100
    },
    isTeacher: {
        type: Boolean,
        default: false
    },
    isStudent: {
        type: Boolean,
        default: false
    },
    token: {
        type: String,
    },
    role: {
        type: String,
        enum : [userRoles.admin, userRoles.user, userRoles.manager],
        default: userRoles.user
    },
    avatar: {
        type: String,
        default: 'uploads/profile.jpeg'
    }
})

module.exports = mongoose.model('User', userSchema);
