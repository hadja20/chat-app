const Channel = require('../models/channel');


const getAllChannels = async (req, res) => {

    try {
        const channels = await Channel.find({});
        return res.status(200).json({ "channels": channels });
    } catch (err) {
        return res.status(404).json({ "message": err })
    }
};

const getOneChannel = async (req, res) => {
    try {

        const name = req.params.name;

        const channel = Channel.findOne({ name: name });

        return res.status(200).json({ "channel": channel });

    } catch (err) {
        return res.status(404).json({ "message": "Channel not found" });
    }

};


const getAllUsersOfChannel = async (req, res) => {

    try {
        const name = req.params.name;

        const channel = await Channel.findOne({ name: name });

        const users = channel.users;
        return res.status(200).json({ "users": users });

    } catch (err) {
        return res.status(400).json({ "message": "Channel not found" })
    }

};

const createChannel = async (req, res) => {

    try {
        const channel = await Channel.create({ name: req.params.name });
        return res.status(200).json({ "channel": channel });
    } catch (err) {
        return res.status(400).json(err);
    }

};

const deleteChannel = async (req, res) => {

    try {
        const name = req.params.name;
        const channel = await Channel.findOneAndDelete({ name: name });
        return res.status(200).json({ 'message': "Channel deleted succesfully" });
    } catch (err) {
        return res.status(400).json({ "message": "Channel not found" });
    }
};


module.exports = { createChannel, deleteChannel, getAllChannels, getOneChannel, getAllUsersOfChannel }