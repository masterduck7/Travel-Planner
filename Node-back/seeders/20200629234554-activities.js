'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Activities', [{
      name: 'Ski',
      activity_date: '2020/01/01',
      numberPersons: 1,
      amount_paid: '1000',
      badge_amount_paid: 'USD',
      amount_not_paid: '500',
      badge_amount_not_paid: 'USD',
      total_price: '1500',
      badge_total_price: 'USD',
      cityID: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Free Tour',
      activity_date: '2020/01/10',
      numberPersons: 2,
      amount_paid: '1000',
      badge_amount_paid: 'EUR',
      amount_not_paid: '500',
      badge_amount_not_paid: 'EUR',
      total_price: '1500',
      badge_total_price: 'USD',
      cityID: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Activities', { name: 'Ski' }, { name: 'Free Tour' });
  }
};