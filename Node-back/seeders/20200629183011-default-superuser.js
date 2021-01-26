crypto = require('crypto')
require('dotenv').config();
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const username = process.env.SEED_SUPERUSER_USERNAME;
    const password = process.env.SEED_SUPERUSER_PASSWORD;
    let salt = crypto.randomBytes(16).toString('base64')
    let hash = crypto.createHmac('sha512', salt)
      .update(password)
      .digest("base64")
    let safepassword = salt + "$" + hash
    return queryInterface.bulkInsert('Users', [{
      email: 'admin@lpsoftware.space',
      password: safepassword,
      username: username,
      country: 'CL',
      permissionLevel: 10,
      visitedCountries: 'CL',
      currency: 'CLP',
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', { email: 'admin@lpsoftware.space' }, {});
  }
};