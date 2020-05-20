const JWT = require('../models/JWT');

module.exports = {
    async store(request, response) {
        return response.json(await JWT.create(request.body.email, request.body.password));
    },

    async showUser(request, response) {

    },
}