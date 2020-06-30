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
    badge_amount_paid: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amount_not_paid: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    badge_amount_not_paid: {
      type: DataTypes.STRING,
      allowNull: false
    },
    total_price: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    badge_total_price: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Activity',
  });
  return Activity;
};