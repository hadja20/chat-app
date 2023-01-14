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
    console.log(isInChannel("general", "63c1471137d3f0949de6671c"));

    try {
        const name = req.params.name;
        const id = req.params.id;
        const user = await User.findOne({ _id: id });
        let data = await Channel.findOne({ name: name });
        const members = data.users;

        let canJoinCHannel = true;
        for (let el of members) {
            if (JSON.stringify(el) === JSON.stringify(user)) {
                canJoinCHannel = false;
            }
        }

        if (canJoinCHannel) {
            const channel = await Channel.findOne({ name: name }).updateOne({ $push: { users: user } });
            const members = await Channel.findOne({ name: name });
            return res.status(200).json({ "message": `${user.username} has joined the channel`, "users": members.users });
        } else {
            return res.status(200).json({ "message": "User has already joined the channel" });
        }
    } catch (err) {
        console.log(err)
        return res.status(400).json({ "messsage": "Try again." });
    }
}

const quitChannel = (req, res) => {

    const name = req.params.name;
    const id = req.params.id;
    console.log(isInChannel("general", "63c1471137d3f0949de6671c"));
    var channel;
    Channel.findOne({ name: name }).then((data) => {
        if (!data) {
            return res.json({ "message": "Channel not found" });
        } else {

            channel = data;
            let user;
            User.findOne({ _id: id }).then(data => {
                user = data;
                if (!user) {
                    return res.json({ "message": "User not found" });
                } else {

                    user = data;
                    let members = channel.users;
                    let isInChannel = false;
                    for (let el of members) {
                        if (JSON.stringify(el) === JSON.stringify(user)) {
                            isInChannel = true;
                        }
                    }
                    if (isInChannel) {
                        Channel.findOneAndUpdate({ name: name }, { $pull: { users: user } }).then(data => {
                            return res.status(200).json({ "message": "User left the channel succesfully" });
                        });
                    } else {
                        return res.status(400).json({ "message": "User cannot left the channel" });
                    }

                }
            }).catch(error => {
                return res.status(400).json({ "message": "An error occured" });
            });

        }
    }).catch(error => {
        return res.status(400).json({ "message": "An error occured" });
    });


}
module.exports = { getAllUsers, changeUsername, joinChannel, quitChannel }