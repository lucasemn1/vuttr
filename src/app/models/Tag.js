const { openConnection } = require('../../database/connection');

class Tag {
    static async all(userId) {
        const connection = openConnection();
        try{
            const tags = await connection('tags').select('*');

            return tags;
        }
        catch(err){
            connection.destroy();
            console.log(err)
            return null;
        }
    }

    static async create(tag) {
        const connection = openConnection();
        try{
            const id = await connection('tags')
                .insert({tag});

            connection.destroy();
            return id;
        }
        catch(err){
            connection.destroy();
            console.log(err)
            return null;
        }
    }

    static async find(tagId) {
        const connection = openConnection();
        try{
            const tag = await connection('tags')
                .select('*')
                .where('tags.id', '=', tagId);

            connection.destroy();
            return tag;
        }
        catch(err){
            connection.destroy();
            console.log(err)
            return null;
        }
    }

    static async tagExists(tag) {
        const connection = openConnection();
        try{
            const result = await connection('tags')
                .select('*')
                .where('tags.tag', 'LIKE', tag)
                .first();

            connection.destroy();
            return result.id ? result.id: -1;
        }
        catch(err){
            connection.destroy();
            console.log(err);
            return -1;
        }
    }

    static async registreTagsTools(tagId, toolId) {
        const connection = openConnection();
        try{
            const id = await connection('tagsTools')
                .insert({ tagId, toolId });

            connection.destroy();
            return id;
        }
        catch(err){
            connection.destroy();
            console.log(err)
            return null;
        }
    }
}

module.exports = Tag;