const { openConnection } = require('../../database/connection');

class Tool {
    static async all(userId) {
        const connection = openConnection();
        try{
            const tools = await connection('tools')
                .select([
                    'id',
                    'title',
                    'link',
                    'description'
                ])
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
            const [id] = await connection('tools')
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
                .select([
                    'id',
                    'title',
                    'link',
                    'description'
                ])
                .where('tools.id', '=', toolId)
                .where('tools.userId', '=', userId)
                .first();

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
                .select([
                    'tools.id',
                    'tools.title',
                    'tools.link',
                    'tools.description',
                ])
                .join('tagsTools', 'tagsTools.toolId', 'tools.id')
                .join('tags', 'tags.id', 'tagsTools.tagId')
                .where('tags.tag', '=', tag)
                .where('tools.userId', '=', userId)

            connection.destroy();
            return tools;
        }
        catch(err){
            connection.destroy();
            console.log(err)
            return null;
        }
    }

    static async findTags(toolId) {
        const connection = openConnection();
        try{
            const tags = await connection('tags')
                .select([
                    'tags.tag',
                ])
                .join('tagsTools', 'tagsTools.tagId', 'tags.id')
                .join('tools', 'tagsTools.toolId', 'tools.id')
                .where('tools.id', '=', toolId);

            connection.destroy();
            return tags;
        }
        catch(err){
            connection.destroy();
            console.log(err)
            return null;
        }
    }

    static async delete(toolId, userId) {
        const connection = openConnection();
        try{
            const result = await connection('tools')
                .where('tools.userId', '=', userId)
                .where('tools.id', '=', toolId)
                .del();
            
            connection.destroy();
            return result === 1? true: false;
        }
        catch(err){
            connection.destroy();
            console.log(err)
            return null;
        }
    }
}

module.exports = Tool;