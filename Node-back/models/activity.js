'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Activity extends Model {
    static associate(models) {
      Activity.belongsTo(models.City,{
        foreignKey: 'cityID',
        onDelete: 'CASCADE',
      })
    }
  };
  Activity.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    activity_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    amount_paid: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    amount_not_paid: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    total_price: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Activity',
  });
  return Activity;
};