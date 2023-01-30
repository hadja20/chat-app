const Channel = require('../models/channel');
const User = require('../models/user');
const Message = require('../models/message')
const { existChannel, exitsUser } = require('../controllers/utils/util');


const createMessage = async (req, res) => {
    const sender = req.params.sender;
    const receiver = req.params.receiver;
    const message = req.body.message;

    let userReceiver, channelReceiver;
    try {

        await exitsUser(receiver).then(data => userReceiver = data);
        await existChannel(receiver).then(data => channelReceiver = data);

        if (userReceiver || channelReceiver) {
            const messageToSend = await Message.create({ receiver: receiver, idSender: sender, message: message });
            return res.status(200).json({ "message": "Message succesfully created", "messageToSend": messageToSend })
        } else {
            return res.status(400).json({ "message": "Message cannot be sent to this user or channel" });
        }
    } catch (err) {
        return res.status(400).json({ "message": "An error occured while creating the message." })
    }

}


const loadChannelMessages = async (req, res) => {

    try {

        const channelName = req.params.name;
        let verifyChannel;

        await existChannel(channelName).then(data => verifyChannel = data);
        if (verifyChannel) {

            const messageLoaded = await Message.find().where({ receiver: channelName });
            return res.status(200).json({ "message": "Messages loaded successfully.", "messageLoaded": messageLoaded });


        } else {
            return res.status(404).json({ "message": "Channel not found" });
        }

    } catch (err) {
        return res.status(400).json({ "message": "Cannot load channel messages" })
    }

}

const loadUserMessages = async (req, res) => {

    const idUser = req.params.idUser;
    let verifyUser;
    try {
        await exitsUser(idUser).then(data => verifyUser = data);

        if (verifyUser) {
            const messageLoaded = await Message.find().where({ receiver: idUser });
            return res.status(200).json({ "message": "Messages loaded sucessfully", "messageLoaded": messageLoaded });

        } else {
            return res.status(404).json({ "message": "User not found" });
        }
    } catch (err) {
        return res.status(400).json({ "message": "Cannot load message." })
    }

}

module.exports = { createMessage, loadChannelMessages, loadUserMessages }