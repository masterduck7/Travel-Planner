'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Cities', [{
      name: 'Lyon',
      country: 'FR',
      map_link: 'lyon.map',
      tripID: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Madrid',
      country: 'ES',
      map_link: 'madrid.map',
      tripID: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Cities', { name: 'Lyon' }, { name: 'Madrid' });
  }
};