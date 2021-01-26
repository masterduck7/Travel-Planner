'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cost extends Model {
    static associate(models) {
      Cost.belongsTo(models.City, {
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
    numberPersons: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
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
    modelName: 'Cost',
  });
  return Cost;
};