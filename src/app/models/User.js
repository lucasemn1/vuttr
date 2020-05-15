const connection = require('../../database/connection')

class User {
    static async find(id) {
        try{
            const user = await connection('users').select('*').where('id', '=', id);
            return user;
        }
        catch(err) {
            console.error(err)
            return null;
        }
    }

    static async create(data) {
        try{
            const userId = await connection('users').insert(data);
            return await this.find(userId);
        }
        catch(err) {
            console.error(err)
            return null;
        }
    }
}

module.exports = User;