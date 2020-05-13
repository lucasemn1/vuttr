const User = require('../models/User')

module.exports = {
    async store(req, res) {
        const user = await User.create({
            name: 'Lucas',
            email: 'lucasi@gmail.com',
            password: '123'
        })
    
        return res.send(user)
    }
}