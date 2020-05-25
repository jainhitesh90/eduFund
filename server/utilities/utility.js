const jwt = require('jsonwebtoken');
const { isNil } = require('lodash');

class Utility {
    static secret = process.env.JWT_SECRET;
    static options = { expiresIn: '1y', issuer: 'https://edu-fund.io' };

    static createToken = (email) => {
        const payload = { email: email };
        const token = jwt.sign(payload, this.secret, this.options);
        return token;
    }

    static verifyToken = (req, res, next) => {
        const headers = req.headers;
        const authorizationHeader = headers.authorization;
        if (!authorizationHeader) {
            return res.status(400).json({ status: 400, errorMessage: 'Invalid Token' });
        }
        const token = headers.authorization.split(' ')[1]; // Remove keyword Bearer <token>
        try {
            let jwtTokenObject = jwt.verify(token, this.secret, this.options); // verify makes sure that the token hasn't expired and has been issued by us
            if (isNil(jwtTokenObject)) {
                return res.status(400).json({ status: 400, errorMessage: 'Invalid Token' });
            } else {
                req.authenticatedEmail = jwtTokenObject.email;
                next();
            }
        } catch (err) {
            return res.status(400).json({ status: 400, errorMessage: 'Invalid Token' });
        }
    }
}

module.exports = Utility;