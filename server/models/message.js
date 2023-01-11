const mongoose = require('mongoose');

const message = new mongoose.Schema({
    id: Number,
    idSender: Number,
    message: String
});

const Message=mongoose.model('Message',message);
module.exports={Message}