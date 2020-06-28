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
    modelName: 'Hotel',
  });
  return Hotel;
};