'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Costs', [{
      name: 'Food',
      total_price: '500',
      numberPersons: 1,
      badge_total_price: 'USD',
      cityID: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Drinks',
      total_price: '200',
      numberPersons: 2,
      badge_total_price: 'EUR',
      cityID: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Costs', { name: 'Food' }, { name: 'Drinks' });
  }
};