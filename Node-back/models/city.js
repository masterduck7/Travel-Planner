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
      City.hasMany(models.Hotel,{
        foreignKey: 'cityID',
        as: 'hotels',
      })
      City.hasMany(models.Cost,{
        foreignKey: 'cityID',
        as: 'citycosts',
      })
      City.hasMany(models.Activity,{
        foreignKey: 'cityID',
        as: 'activities',
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
    }
  }, {
    sequelize,
    modelName: 'City',
  });
  return City;
};