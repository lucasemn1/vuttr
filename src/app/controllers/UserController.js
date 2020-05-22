const User = require('../models/User');
const JWT = require('../models/JWT');

module.exports = {
    async store(request, response) {
        const userId = await User.create(request.body);

        if( !userId ) {
            return response.status(500).json({ message: 'The user cannot be created.' });
        }

        const user = await User.find(userId);

        return response.status(201).json(user);
    },

    async show(request, response) {
        const user = await JWT.getUser(request.headers.authorization);

        if( !user ) {
            return response.status(404).json({ message: "User was not found." })
        }

        return response.status(200).json(user);
    },

    async update(request, response) {

        const userData = {
            name: request.body.name,
            email: request.body.email,
            password: request.body.password
        }

        const { userId } = JWT.getPayload(request.headers.authorization);
        const user = await User.update(userData, userId);

        if( !user ) {
            return response.status(404).json({ message: 'User was not found.' })
        }

        return response.status(200).json(user);
    },

    async delete(request, response) {
        const { userId } = JWT.getPayload(request.headers.authorization);

        if( await User.delete(userId) ) {
            return response.status(200).json({});
        }

        return response.status(500).json({});
    }
}