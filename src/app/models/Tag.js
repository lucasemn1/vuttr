const Model = require('./Model');

class Tags extends Model {
    static table = 'tags';
    static fields = ['tag'];
    static publicFields = ['id', ...this.fields];
}

module.exports = Tags;