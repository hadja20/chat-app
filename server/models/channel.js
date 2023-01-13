const mongoose = require('mongoose');

const channel = new mongoose.Schema({

    id: String,
    name: String,
    users: Array
});

const Channel = mongoose.model('channel', channel);

module.exports = Channel 