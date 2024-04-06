const config = require('./knexfile');

const { production } = config;

knex = require('knex')(production);

module.exports = knex