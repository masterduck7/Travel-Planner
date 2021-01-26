'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Hotels', [{
      name: 'Paris',
      number_beds: 1,
      numberPersons: 1,
      start_date: '2020/01/01',
      end_date: '2020/01/08',
      breakfast: true,
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
      name: 'Barcelona',
      number_beds: 2,
      numberPersons: 2,
      start_date: '2020/11/10',
      end_date: '2020/11/18',
      breakfast: false,
      amount_paid: '1000',
      badge_amount_paid: 'EUR',
      amount_not_paid: '0',
      badge_amount_not_paid: 'EUR',
      total_price: '1000',
      badge_total_price: 'EUR',
      cityID: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Hotels', { name: 'Paris' }, { name: 'Barcelona' });
  }
};