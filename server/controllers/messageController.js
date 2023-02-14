const Channel = require('../models/channel');
const User = require('../models/user');
const Message = require('../models/message');
const { existChannel, exitsUser } = require('../controllers/utils/util');



/**
 * Create message to send to channel
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const createMessageChannel = async (req, res) => {
    const sender = req.params.sender;
    const receiver = req.params.receiver;
    const message = req.body.message;

    let  channelReceiver;
    try {
       await existChannel(receiver).then(data=>channelReceiver=data.name);

        if (channelReceiver) {
            const messageToSend = await Message.create({ receiver: receiver, idSender: sender, message: message });
            return res.status(200).json({ "message": "Message succesfully created", "messageToSend": messageToSend })
        } else {
            return res.status(400).json({ "message": "Message cannot be sent to this channel" });
        }
    } catch (err) {
        console.log(err)
        return res.status(400).json({ "message": "An error occured while creating the message." })
    }

}


/**
 * Create message to send to user
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */

const createMessageUser = async (req, res) => {
    const sender = req.params.sender;
    const receiver = req.params.receiver;
    const message = req.body.message;

    let userReceiver;
    try {
       await exitsUser(receiver).then(data=>userReceiver=data._id)

        if (userReceiver) {
            const messageToSend = await Message.create({ receiver: receiver, idSender: sender, message: message });
            return res.status(200).json({ "message": "Message succesfully created", "messageToSend": messageToSend })
        } else {
            return res.status(400).json({ "message": "Message cannot be sent to this user " });
        }
    } catch (err) {
        console.log(err);
        return res.status(400).json({ "message": "An error occured while creating the message." })
    }

}

/**
 * Load all message of channels
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
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
        console.log(err);
        return res.status(400).json({ "message": "Cannot load channel messages" })
    }

}


/**
 * Load  all message received by user from another specific user
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const loadUserMessages = async (req, res) => {

    const receiver = req.params.receiver;

    const sender=req.params.sender;
    let verifyUser;
    try {
        await exitsUser(receiver).then(data => verifyUser = data);

        if (verifyUser) {
            const messageLoaded = await Message.find().where({ receiver: receiver, idSender: sender });
            return res.status(200).json({ "message": "Messages loaded sucessfully", "messageLoaded": messageLoaded });

        } else {
            return res.status(404).json({ "message": "User not found" });
        }
    } catch (err) {
        console.log(err);
        return res.status(400).json({ "message": "Cannot load message." })
    }

}

module.exports = { createMessageUser,createMessageChannel, loadChannelMessages, loadUserMessages}