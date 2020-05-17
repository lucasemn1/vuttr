const knex = require('knex');
const configuration = require('../../knexfile');


exports.openConnection = () => knex(configuration[process.env.NODE_ENV]);