const mongoose = require('mongoose');

const message = new mongoose.Schema({
    id: {
        type: String,
        require: true
    },
    idSender: {
        type: String,
        require: true,
    },
    receiver: {
        type: String,
        require: true,
    },
    message: {
        type: String,
        require: true
    },

    isChannel:{
        type: Boolean,
        require:true
    }
});

const Message = mongoose.model('Message', message);
module.exports = Message 