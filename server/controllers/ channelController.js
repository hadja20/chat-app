const Channel = require('../models/channel');
const User = require('../models/user');
const { exitsUser, existChannel, isCreator } = require('./utils/util');


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
        const name = req.body.name;
        const channel = await Channel.findOne({ name: name });
        const users = channel.users;
        return res.status(200).json({ "users": users });

    } catch (err) {
        return res.status(400).json({ "message": "Channel not found" })
    }

};

const createChannel = async (req, res) => {

    try {
        const id = req.params.id;
        const name = req.body.name;
        if (await exitsUser(id)) {
            const user = await User.findById(id);
            const channel = await (await Channel.create({ name: name, creator: id })).updateOne({ $push: { users: user } });
            const result = await Channel.findOne({ name: name });
            return res.status(200).json({ "channel": result, "message": "Channel created successfully." });

        }
    } catch (err) {
        return res.status(400).json({ "message": "An error occured while creating a new channel" });
    }

};

const deleteChannel = async (req, res) => {

    try {
        const name = req.params.name;
        const id = req.params.id;

        if (await isCreator(id, name)) {
            const channel = await Channel.findOneAndDelete({ name: name });
            return res.status(200).json({ 'message': "Channel deleted succesfully" });

        } else {
            return res.status(401).json({ 'message': "You can't delete this channel." });
        }

    } catch (err) {
        return res.status(400).json({ "message": "Channel not found" });
    }
};


const deleteChannelById = async (req, res) => {
    try {
        const id = req.params.id;
        const channel = await Channel.findOneAndDelete({ _id: id });
        return res.status(200).json({ "message": "Channel deleted succesffuly" });
    } catch (err) {
        return res.status(400).json({ "message": "Error while deleting channel" });
    }
}

module.exports = { createChannel, deleteChannel, getAllChannels, getOneChannel, getAllUsersOfChannel, deleteChannelById }