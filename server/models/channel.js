const mongoose = require('mongoose');

const channel = new mongoose.Schema({

    id: {
        type: String,
        require: true,
    },
    name: {
        type: String,
        require: true,
        unique: true,
    },
    creator: {
        type: String,
        require: true,
    },
    users: {
        type: Array,
        require: true,
    },
});

const Channel = mongoose.model('channel', channel);

module.exports = Channel 