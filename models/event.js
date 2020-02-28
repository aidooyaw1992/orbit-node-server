'use strict';
module.exports = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    locationId: DataTypes.INTEGER,
    ownerId: DataTypes.INTEGER,
  }, {});

  Event.associate = function(models) {
    Event.hasOne(models.Payment,  {foreignKey: 'eventId'});
    Event.belongsTo(models.User,  {foreignKey: 'ownerId'});
    Event.belongsTo(models.Location,  {foreignKey: 'locationId'});
  };

  return Event;
};