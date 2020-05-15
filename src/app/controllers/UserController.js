const User = require('../models/User')

module.exports = {
    async store(request, response) {
        const user = await User.create(request.body)

        if( !user ) {
            return response.status(500).json({ message: "User cannot be created" })
        }

        return response.status(201).json(user.data);
    }
}