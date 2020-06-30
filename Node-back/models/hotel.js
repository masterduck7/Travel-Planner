'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hotel extends Model {
    static associate(models) {
      Hotel.belongsTo(models.City,{
        foreignKey: 'cityID',
        onDelete: 'CASCADE',
      })
    }
  };
  Hotel.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    number_beds: {
      type: DataTypes.INTEGER,
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
    breakfast: {
      type: DataTypes.BOOLEAN,
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
    modelName: 'Hotel',
  });
  return Hotel;
};