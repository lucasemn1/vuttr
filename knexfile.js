// Update with your config settings.
const dotenv = require('dotenv')
dotenv.config({
  path: process.env.NODE_ENV !== 'test' ? '.env': '.env.test'
})

const migrationsPath = './src/database/migrations';

module.exports = {
  test: {
    client: 'sqlite',
    connection: {
      filename: `./src/database/${process.env.DB_DATABASE}.sqlite`
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: migrationsPath
    },
    seeds: {
      directory: './src/database/seeds'
    },
  },

  development: {
    client: 'mysql',
    connection: {
      database: process.env.DB_DATABASE,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: migrationsPath
    },
    seeds: {
      directory: './src/database/seeds'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: migrationsPath
    }
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: migrationsPath
    }
  }

};
