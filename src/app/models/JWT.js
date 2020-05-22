const jwt = require('jsonwebtoken');
const User = require('./User');
const { openConnection } = require('../../database/connection');

class JWT {
    static async create(email, password) {
        const connection = openConnection();

        const user = await User.findWithCredentials(email, password)
        
        if(!user) {
            return null;
        }

        const privateKey = process.env.APP_KEY;

        const token = jwt.sign({ userId: user.id }, privateKey, { 
            algorithm: 'HS256',
            expiresIn: '1 day'
         })

        connection.destroy();

        return {
            expiresIn: '1 day',
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