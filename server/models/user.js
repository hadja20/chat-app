const mongoose = require('mongoose');

const user = new mongoose.Schema({
    id: String,
    username: String,
    password: String
});

const User = mongoose.model('User', user);

module.exports = User