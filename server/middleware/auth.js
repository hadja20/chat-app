const jwt = require('jsonwebtoken')
require('dotenv').config()
const SECRET_KEY=process.env.SECRET_KEY;

const auth = (req, res, next) => {

    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
        const message = `No access_token provided`;
        return res.status(401).json({ message });
    }

    const token = authorizationHeader.split(' ')[1]
    jwt.verify(token, SECRET_KEY, (error) => {
        if (error) {
            const message = `Not authorized`
            return res.status(401).json({ message });
        }
        next();     
    })
}

module.exports=auth;
