require('dotenv').config();
const varProd = require('../varProd.js');
module.exports = {
  development: {
    "username": varProd.DB_USERNAME,
    "password": varProd.DB_PASSWORD,
    "database": varProd.DB_NAME,
    "host": varProd.DB_HOSTNAME,
    "port": varProd.DB_PORT,
    "dialect": varProd.DB_DIALECT,
    "pool": {
      "max": parseInt(varProd.DB_POOL_MAX),
      "min": parseInt(varProd.DB_POOL_MIN),
      "acquire": parseInt(varProd.DB_POOL_ACQUIRE),
      "idle": parseInt(varProd.DB_POOL_IDLE)
    }
  },
  test: {
    "username": varProd.DB_USERNAME,
    "password": varProd.DB_PASSWORD,
    "database": varProd.DB_NAME,
    "host": varProd.DB_HOSTNAME,
    "port": varProd.DB_PORT,
    "dialect": varProd.DB_DIALECT,
    "pool": {
      "max": parseInt(varProd.DB_POOL_MAX),
      "min": parseInt(varProd.DB_POOL_MIN),
      "acquire": parseInt(varProd.DB_POOL_ACQUIRE),
      "idle": parseInt(varProd.DB_POOL_IDLE)
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