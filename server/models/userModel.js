const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        min: 8
    },
    isPremiumMember : { type: Boolean, default:false},
    mobile: {
        type: Number,
        default: 0
    } ,
    role: {
        type: String,
        required: true,
        default : "site"
    }
}, { timestamps: true });


const users = mongoose.model('users', userSchema);

module.exports = users;