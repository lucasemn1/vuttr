const chance = require('chance').Chance()

exports.user = (data) => {
    return {
        name: chance.name(),
        email: chance.email(),
        password: chance.string(),
        ...data
    }
}