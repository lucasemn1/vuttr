const Model = require('./Model');

class User extends Model {
    static table = 'users'
    static fields = ['name', 'email', 'password'];
    static publicFields = ['id', ...this.fields];

    static async tools() {
        return null;
    }
}

module.exports = User;