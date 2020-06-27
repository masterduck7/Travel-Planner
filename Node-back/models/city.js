'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    static associate(models) {
      City.belongsTo(models.Trip,{
        foreignKey: 'tripID',
        onDelete: 'CASCADE',
      })
    }
  };
  City.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    map_link: {
      type: DataTypes.STRING,
      allowNull: true
    },
    total_cost: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'City',
  });
  return City;
};