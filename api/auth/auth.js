const jwt = require('jsonwebtoken')
const JWT_KEY = "SECRET"; //hardcoded jwt secret :)

module.exports = (req, res, next) => { //default middleware pattern for express apps
    try {
        const token = req.headers.authorization.split(" ")[1]; //exempt Bearer from Auth header

        const decoded = jwt.verify(token, JWT_KEY);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Authentication Failed'
        });
    }
};