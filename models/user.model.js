const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        lowecase: true,
        unique: true,
        minLength: [3,'username length aleast be 3']
    },

    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        minLength: [10,'email must be 10 digit long']
    },

    password: {
        type: String,
        required: true,
        trim: true,
        minLength: [8,'email must be 8 digit long']
    }
})

const userModel = mongoose.model('user',userSchema);
module.exports = userModel;