// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  production: {
    client: 'mysql2',
    connection: {
      host: process.env['MYSQL_HOST'],
      port: process.env['MYSQL_PORT'],
      database: process.env['MYSQL_DB'],
      user: process.env['MYSQL_USERNAME'],
      password: process.env['MYSQL_PASSWORD'],
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: "./db/migrations"
    }
  }

};
