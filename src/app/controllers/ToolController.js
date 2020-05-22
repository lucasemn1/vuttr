const { openConnection } = require('../../database/connection')
const jwt = require('jsonwebtoken');
const Tool = require('../models/Tool');
const Tag = require('../models/Tag');

module.exports = {
    async index(request, response) {
        const { userId } = jwt.decode(request.headers.authorization);
        const tagToSearch = request.query.tag;
        let tools = [];

        if(!tagToSearch) {
            tools = await Tool.all(userId);
        }
        else {
            tools = await Tool.findByTag(tagToSearch, userId);
        }

        for(const tool of tools) {
            const tags = await Tool.findTags(tool.id);

            tool.tags = [];

            for(const tag of tags) {
                tool.tags.push(tag.tag);
            }
        }

        return response.status(200).json(tools);
    },

    async store(request, response) {
        const { userId } = jwt.decode(request.headers.authorization);
        const toolId = await Tool.create(request.body, userId);
        const tool = await Tool.find(toolId, userId);

        if( !tool ) {
            console.log(`TOOL: ${tool}`)
            return response.status(500).json({ message: "Tool cannot be created." })
        }

        const { tags } = request.body;

        for(const tag of tags) {
            let tagId = await Tag.tagExists(tag);

            if( tagId === -1 ) {
                tagId = await Tag.create(tag);
            }


            await Tag.registreTagsTools(tagId, toolId);
        };

        tool.tags = tags;
        return response.status(201).json(tool);
    },

    async destroy(request, response) {
        const { userId } = jwt.decode(request.headers.authorization);
        const toolId = request.params.id;

        const result = await Tool.delete(toolId, userId);

        if(!result) {
            return response.status(500).json({ message: "Couldn't delete the tool." });
        }

        return response.status(200).json();
    }
}