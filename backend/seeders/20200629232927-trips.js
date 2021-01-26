'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Trips', [{
      destination: 'Paris',
      start_date: '2020/01/01',
      end_date: '2020/01/08',
      planning_file: 'paris.xlsx',
      status: 'PAST',
      userID: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      destination: 'Barcelona',
      start_date: '2020/11/10',
      end_date: '2020/11/18',
      planning_file: 'barcelona.xlsx',
      status: 'FUTURE',
      userID: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Trips', { destination: 'Paris' }, { destination: 'Barcelona' });
  }
};