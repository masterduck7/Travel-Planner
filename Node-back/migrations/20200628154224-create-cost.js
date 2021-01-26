'use strict';
var DataTypes = require('sequelize/lib/data-types');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Costs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      numberPersons: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      total_price: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      badge_total_price: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      cityID: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull: false,
        references: {
          model: 'Cities',
          key: 'id'
        }
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Costs');
  }
};