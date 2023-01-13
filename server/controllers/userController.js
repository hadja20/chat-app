const User = require('../models/user');

const Channel = require('../models/channel');

const getAllUsers = async (req, res) => {
    const users = await User.find({});
    return res.json({ 'users': users });
}


const changeUsername = async (req, res) => {

    try {
        const username = req.params.username;
        const newUsername = req.body.username;


        const update = await User.where({ username: username }).updateOne({ username: newUsername });
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
        console.log(user);
        const channel = await Channel.findOne({ name: name });
        console.log(channel);
        const members = channel.users;
        members.push(user);
        return res.status(200).json({ "message": `${user.username} has joined the channel` }, { "users": members });
    } catch (err) {
        res.status(400).json({ "message": "Error while joining channel" });
    }

}
module.exports = { getAllUsers, changeUsername, joinChannel }