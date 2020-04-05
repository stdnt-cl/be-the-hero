const knex = require('knex');
const config = require('../../knexfile');

const environmentConfig = process.env.NODE_ENV === 'test' ? config.test : config.development;

const connection = knex(environmentConfig);

module.exports = connection;
