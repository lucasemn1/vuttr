const Model = require('./Model');

class Tool extends Model {
    static table = 'tools'
    static fields = ['title', 'link', 'description', 'userId'];
    static publicFields = ['id', 'title', 'link', 'description'];
}

module.exports = Tool;