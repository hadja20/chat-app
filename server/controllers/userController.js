const User = require('../models/user');
const Channel = require('../models/channel');
const { exitsUser, existChannel, isUserInChannel } = require('../controllers/utils/util');

const getAllUsers = async (req, res) => {
    const users = await User.find({});
    return res.json({ 'users': users });
}


const changeUsername = async (req, res) => {

    try {
        const username = req.params.username;
        const newUsername = req.body.username;
        const update = await User.where({ username }).updateOne({ username: newUsername });
        const user = await User.findOne({ username: newUsername });

        return res.status(200).json({ 'user': user });

    } catch (err) {
        return res.status(404).json({ "message": "User not found" });

    }

}


const joinChannel = async (req, res) => {

    try {
        const name = req.params.name;
        const id = req.params.id;
        const user = await User.findOne({ _id: id });
        let isInChannel;


        if (await exitsUser(id) && await existChannel(name)) {

            await isUserInChannel(id, name).then(data => { isInChannel = data; console.log(isInChannel) });

            if (!isInChannel) {

                const channel = await Channel.findOne({ name }).updateOne({ $push: { users: user } });
                const members = await Channel.findOne({ name });

                return res.status(200).json({ "message": `${user.username} has joined the channel`, "users": members.users });

            } else {

                return res.status(200).json({ "message": "User has already joined the channel" })
            }

        } else if (existChannel(name)) {

            return res.status(404).json({ "message": "User not found" });

        } else {
            return res.status(404).json({ "message": "Channel not found" });

        }
    } catch (err) {
        return res.status(400).json({ "messsage": "Try again." });
    }
}

const quitChannel = async (req, res) => {
    try {
        const name = req.params.name;
        const id = req.params.id;
        let isInChannel = null;

        if (exitsUser(id)) {

            await isUserInChannel(id, name).then(data => isInChannel = data);
            if (!isInChannel) {
                return res.status(200).json({ "message": "User is not in channel" })

            } else {
                const user = await User.findOne({ _id: id });
                const updateChannel = await Channel.findOneAndUpdate({ name }, { $pull: { users: user } });
                const channel = await Channel.findOne({ name })
                return res.status(200).json({ "message": `${user.username} left the channel succesfully`, "users": channel.users });

            }

        } else if (existChannel(name)) {

            return res.status(404).json({ "message": "User not found" });

        } else {
            return res.status(404).json({ "message": "Channel not found" });

        }
    }

    catch (err) {
        return res.status(400).json({ "message": "Try again." })
    }
}

module.exports = { getAllUsers, changeUsername, joinChannel, quitChannel }