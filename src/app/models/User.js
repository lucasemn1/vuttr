const connection = require('../../database/connection')

class User {
    static async find(id) {
        const user = await connection().select('*').from('users').where('id', '=', id);
        return user;
    }

    static async create(data) {
        const userId = await connection('users').insert(data);

        return this.find(userId);
    }
}

module.exports = User;