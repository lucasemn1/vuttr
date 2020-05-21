const { openConnection } = require('../../database/connection')
const jwt = require('jsonwebtoken');
const Tool = require('../models/Tool');
const Tag = require('../models/Tag');

module.exports = {
    async index(request, response) {
        const { userId } = jwt.decode(request.headers.authorization);
        const tools = await Tool.all(userId);

        return response.status(200).json(tools);
    },

    async store(request, response) {
        const { userId } = jwt.decode(request.headers.authorization);
        const toolId = await Tool.create(request.body, userId);
        const tool = await Tool.find(toolId, userId);

        if( !tool ) {
            return response.status(500).json({ message: "Tool cannot be created" })
        }

        const { tags } = request.body;


        for(const tag of tags) {
            let tagId = await Tag.tagExists(tag);

            if( tagId === -1 ) {
                tagId = await Tag.create(tag);
            }

            const relationShipId = await Tag.registreTagsTools(tagId, toolId);
            console.log(relationShipId);
        };

        tool.tags = tags;
        return response.status(201).json(tool);
    },
}