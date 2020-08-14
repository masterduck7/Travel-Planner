require('dotenv').config();
module.exports = {
  development: {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOSTNAME,
    "port": process.env.DB_PORT,
    "dialect": process.env.DB_DIALECT,
    "pool": {
      "max": parseInt(process.env.DB_POOL_MAX),
      "min": parseInt(process.env.DB_POOL_MIN),
      "acquire": parseInt(process.env.DB_POOL_ACQUIRE),
      "idle": parseInt(process.env.DB_POOL_IDLE)
    }
  },
  test: {
    "username": process.env.DB_USERNAME,
    "password": process.env.DB_PASSWORD,
    "database": process.env.DB_NAME,
    "host": process.env.DB_HOSTNAME,
    "port": process.env.DB_PORT,
    "dialect": process.env.DB_DIALECT,
    "pool": {
      "max": parseInt(process.env.DB_POOL_MAX),
      "min": parseInt(process.env.DB_POOL_MIN),
      "acquire": parseInt(process.env.DB_POOL_ACQUIRE),
      "idle": parseInt(process.env.DB_POOL_IDLE)
    },
    operatorsAliases: 0,
    logging: false
  },
  production: {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
};