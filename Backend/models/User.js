const mongoose = require('mongoose');
const { Schema } = mongoose;
const Userschema = new Schema(
    {
        Email: {
            type: String,
            require: true
        },
        Name: {
            type: String,
            require: true
        },
        Password: {
            type: String,
            require: true
        },
        location: {
            type: String,
            require: true
        },

    }
);
const User = mongoose.model('User', Userschema);
module.exports = User;