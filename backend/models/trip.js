'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trip extends Model {
    static associate(models) {
      Trip.belongsTo(models.User,{
        foreignKey: 'userID',
        onDelete: 'CASCADE',
      })
      Trip.hasMany(models.Flight,{
        foreignKey: 'tripID',
        as: 'flights',
      })
      Trip.hasMany(models.City,{
        foreignKey: 'tripID',
        as: 'cities',
      })
    }
  };
  Trip.init({
    destination: {
      type: DataTypes.STRING,
      allowNull: false
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    planning_file: {
      type: DataTypes.STRING,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Trip',
  });
  return Trip;
};