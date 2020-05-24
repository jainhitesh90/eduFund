const jwt = require('jsonwebtoken');

class Utility {
    static secret = process.env.JWT_SECRET;
    static options = { expiresIn: '1y', issuer: 'https://edu-fund.io' };

    static createToken = (email) => {
        const payload = { email: email };
        const token = jwt.sign(payload, this.secret, this.options);
        return token;
    }

    static validateToken = (headers) => {
        const authorizationHeaader = headers.authorization;
        if (authorizationHeaader) {
            const token = headers.authorization.split(' ')[1]; // Remove keyword Bearer <token>
            try {
                return jwt.verify(token, this.secret, this.options); // verify makes sure that the token hasn't expired and has been issued by us
            } catch (err) {
                return null;
            }
        } else {
            return null;
        }
    }
}

module.exports = Utility;