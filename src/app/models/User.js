const { openConnection } = require('../../database/connection');

class User {
    static async create(userData) {
        const connection = openConnection();

        try{
            const [ userId ] = await connection('users').insert(userData);
            connection.destroy();
            return userId;
        }
        catch(err) {
            connection.destroy();
            console.log(err);
            return null;
        }
    }

    static async find(userId) {
        const connection = openConnection();

        try{
            const user = await connection('users')
                .select('*')
                .where('id', '=', userId)
                .first();

            connection.destroy();
            return user;
        }
        catch(err) {
            connection.destroy();
            console.log(err);
            return null;
        }
    }   

    static async findWithCredentials(email, password) {
        const connection = openConnection();

        try{
            const user = await connection('users')
                .select('*')
                .where('email', '=', email)
                .where('password', 'LIKE', password)
                .first();

            connection.destroy();
            return user;
        }
        catch(err) {
            connection.destroy();
            console.log(err);
            return null;
        }
    }  

    static async update(userData, userId) {
        const connection = openConnection();

        try{
            await connection('users')
                .where('id', '=', userId)
                .update(userData);

            const user = this.find(userId);
            connection.destroy();

            return user;
        }
        catch(err) {
            connection.destroy();
            console.log(err);
            return null;
        }
    }

    static async delete(userId) {
        const connection = openConnection();

        const result = await connection('users')
            .where('id', '=', userId)
            .delete();
            
        connection.destroy();

        return result === 1 ? true: false;
    }
}

module.exports = User;