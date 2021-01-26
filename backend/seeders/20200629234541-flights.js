'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Flights', [{
      numberPersons: 1,
      origin: 'Lyon',
      destination: 'Paris',
      start_date: '2020/01/01',
      end_date: '2020/01/08',
      airline_name: 'AirFrance',
      flight_number: 'AABB123',
      price: '1000',
      badge_price: 'USD',
      tripID: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      numberPersons: 2,
      origin: 'Madrid',
      destination: 'Barcelona',
      start_date: '2020/11/10',
      end_date: '2020/11/18',
      airline_name: 'Level',
      flight_number: 'CCDD456',
      price: '500',
      badge_price: 'EUR',
      tripID: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Flights', { destination: 'Paris' }, { destination: 'Barcelona' });
  }
};