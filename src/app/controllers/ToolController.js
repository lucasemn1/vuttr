const connection = require('../../database/connection')
const Tool = require('../models/Tool');
const Tag = require('../models/Tag');

module.exports = {
    async index(request, response) {
        const tools = await Tool.all();

        return response.status(200).json(tools);
    },

    async store(request, response) {
        const tool = await Tool.create(request.body)

        if( !tool ) {
            return response.status(500).json({ message: "Tool cannot be created" })
        }

        const { tags } = request.body;

        tags.map( async tag => {
            const result = await connection('tags').select('tag').where('tag', 'LIKE', tag).first();

            if( !result ) {
                await Tag.create({tag});
            }
        });

        tool.data.tags = tags;
        return response.status(201).json(tool.data);
    }
}