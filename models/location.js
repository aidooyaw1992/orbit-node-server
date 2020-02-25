'use strict';
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
  },
    name: DataTypes.STRING,
    region: DataTypes.STRING,
    town: DataTypes.STRING,
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
  },
  updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
  },
  }, {});
  Location.associate = function(models) {};
  return Location;
};