const Channel = require('../../models/channel');
const User = require('../../models/user');


const exitsUser = async (id) => {
    return await User.findOne({ _id: id });
}

const existChannel = async (name) => {
    return await Channel.findOne({ name: name });;
}

const isUserInChannel = async (id, name) => {

    const channel = await Channel.findOne({ name });
    const members = channel.users;
    const user = await User.findOne({ _id: id });
    const userString = JSON.stringify(user);
    const membersString = JSON.stringify(Array.from(members));
    const bool = membersString.indexOf(userString); //return directement ===-1

    if (bool === -1) {
        return false;
    } else {
        return true;
    }
}


const isCreator = async (id, name) => {

    return Channel.find({ name }).where({ creator: id }).then(data => { data }).length !== 0;
}

module.exports = { exitsUser, existChannel, isUserInChannel, isCreator }