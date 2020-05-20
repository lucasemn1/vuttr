const jwt = require('jsonwebtoken');
const User = require('./User');
const { openConnection } = require('../../database/connection');

class JWT {
    static async create(email, password) {
        const connection = openConnection();

        const user = await User.findWithCredentials(email, password)
        
        const privateKey = process.env.APP_KEY;

        const token = jwt.sign({ userId: user.id }, privateKey, { 
            algorithm: 'HS256',
            expiresIn: '1d'
         })

        connection.destroy();

        return {
            expiresIn: '86400 seconds',
            token,
        };
    }

    static async getUser(token) {
        const decode = jwt.decode(token);
        const userId = decode.userId;
        const user = await User.find(userId);

        return user;
    }

    static getPayload(token){
        return jwt.decode(token);
    }
}

module.exports = JWT;