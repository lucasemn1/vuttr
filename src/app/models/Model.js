const connection = require('../../database/connection')

class Model {
    static table = '';
    static fields = [];
    static publicFields = [];

    constructor(data) {
        this.data = data;
    }

    async save() {
        try{
            if(!this.data.id) {
                console.log(this.data);
                return await Model.create(this.data);
            }
            else {
                await connection(Model.table)
                    .where('id', '=', this.data.id)
                    .update(this.data);
                
                return true;
            }
        }
        catch(err) {
            console.error(err)
            return false;
        }
    }

    static async all() {
        try{
            const data = await connection(this.table).select('*');

            const objects = [];

            data.map( obj => {
                objects.push(new Model(data));
            });

            return objects;
        }
        catch(err) {
            console.error(err)
            return null;
        }
    }

    static async find(id) {
        try{
            const data = await connection(this.table).select('*').where('id', '=', id).first();

            const object = new Model(data);

            return object;
        }
        catch(err) {
            console.error(err)
            return null;
        }
    }

    static async create(data) {
        try{
            const dataToSave = {}

            this.fields.map( field => {
                dataToSave[field] = data[field];
            });

            const dataId = await connection(this.table).insert(dataToSave);
            
            return await this.find(dataId);
        }
        catch(err) {
            console.error(err)
            return null;
        }
    }
}

module.exports = Model;