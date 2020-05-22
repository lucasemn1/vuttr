const chance = require('chance').Chance()

const user = (data) => {
    return {
        "name": chance.name(),
        "email": chance.email(),
        "password": chance.string(),
        ...data
    }
}

const tool = (data) => {
    return {
        "title": chance.name(),
        "link": "localhost",
        "description": chance.string(),
        ...data
    }
}

const tag = (data) => chance.string()

exports.user = user;
exports.tool = tool;
exports.tag = tag;