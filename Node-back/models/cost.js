'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cost extends Model {
    static associate(models) {
      Cost.belongsTo(models.City,{
        foreignKey: 'cityID',
        onDelete: 'CASCADE',
      })
    }
  };
  Cost.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    total_price: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Cost',
  });
  return Cost;
};