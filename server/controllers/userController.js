const User = require('../models/user');


const getAllUsers = async (req, res) => {
    const users = await User.find({});
    return res.json({ 'users': users })
}

module.exports = { getAllUsers }