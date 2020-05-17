const User = require('../models/User');

module.exports = {
    async store(request, response) {
        const userData = {
            name: request.body.name,
            email: request.body.email,
            password: request.body.password
        }

        const userId = await User.create(userData);

        if( !userId ) {
            return response.status(500).json({ message: 'The user cannot be created.' });
        }

        const user = await User.find(userId);

        return response.status(201).json(user);
    },

    async show(request, response) {
        const userId = request.params.id;

        const user = await User.find(userId);

        if( !user ) {
            return response.status(404).json({ message: "User was not found." })
        }

        return response.status(200).json(user);
    },

    async update(request, response) {
        const userId = request.params.id;
        const userData = {
            name: request.body.name,
            email: request.body.email,
            password: request.body.password
        }

        const user = await User.update(userData, userId);

        if( !user ) {
            return response.status(404).json({ message: 'User was not found.' })
        }

        return response.status(201).json(user);
    },

    async delete(request, response) {
        const userId = request.params.id;

        if( await User.delete(userId) ) {
            return response.status(200).json({});
        }

        return response.status(500).json({});
    }
}