const { openConnection } = require('../../database/connection');

class Tool {
    static async all(userId) {
        const connection = openConnection();
        try{
            const tools = await connection('tools')
                .select('*')
                .where('tools.userId', '=', userId);

            connection.destroy();
            return tools;
        }
        catch(err){
            connection.destroy();
            console.log(err)
            return null;
        }
    }

    static async create(toolData, userId) {
        const connection = openConnection();
        try{
            const id = await connection('tools')
                .insert({
                    title: toolData.title,
                    link: toolData.link,
                    description: toolData.description,
                    userId: userId
                })

            connection.destroy();
            return id;
        }
        catch(err){
            connection.destroy();
            console.log(err)
            return null;
        }
    }

    static async find(toolId, userId) {
        const connection = openConnection();
        try{
            const tool = await connection('tools')
                .select('*')
                .where('tools.id', '=', toolId)
                .where('tools.userId', '=', userId);

            connection.destroy();
            return tool;
        }
        catch(err){
            connection.destroy();
            console.log(err)
            return null;
        }
    }

    static async findByTag(tag, userId) {
        const connection = openConnection();
        try{
            const tools = await connection('tools')
                .select('tools.*')
                .where('tools.userId', '=', userId)
                .where('tools.id', '=', 'tagsTools.toolId')
                .where('tagTools.id', '=', 'tags.id')
                .where('tags.tag', 'LIKE', tag);

            connection.destroy();
            return tools;
        }
        catch(err){
            connection.destroy();
            console.log(err)
            return null;
        }
    }
}

module.exports = Tool;