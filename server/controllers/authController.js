const User = require('../models/user');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.SECRET_KEY;

const login = async (req, res) => {

    try {
        const username = req.body.username;
        const existUser = await User.findOne({ username });

        if (!existUser) {
            return res.status(404).json({ 'message': 'Username not found' });
        }
        const password = req.body.password;
        const isPasswordCorrect = await bcrypt.compare(password, existUser.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({ 'message': `Password incorrect.` });
        }

        const access_token = jwt.sign({
            data: existUser
        }, SECRET_KEY, { expiresIn: 60 * 60 });

        return res.status(200).json({ "user": username, "access_token": access_token });
    }
    catch (error) {
        return res.status(401).json({ "error": error });
    }
}

const register = async (req, res) => {

    try {
        const username = req.body.username;

        const existUser = await User.findOne({ username });
        if (existUser) {
            return res.status(409).json({ "message": "Username has already been taken ! " })
        }

        const password = await bcrypt.hash(req.body.password, 10);

        const newUser = {
            username: username,
            password: password
        }

        User.create(newUser);

        return res.status(201).json({ 'user': newUser });
    }

    catch (error) {
        return res.status(401).json({ "error": error });
    }
}

module.exports = { login, register }