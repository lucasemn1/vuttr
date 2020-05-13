const knex = require('knex');
const configuration = require('../../knexfile');

module.exports = knex(configuration[process.env.NODE_ENV]);