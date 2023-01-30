const mongoose = require('mongoose');

const user = new mongoose.Schema({
    id: {
        type: String,
        require: true,
    },
    username: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true
    }
});

const User = mongoose.model('User', user);

module.exports = User