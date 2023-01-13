const mongoose = require('mongoose');

const message = new mongoose.Schema({
    id: String,
    idSender: String,
    message: String
});

const Message=mongoose.model('Message',message);
module.exports={Message}