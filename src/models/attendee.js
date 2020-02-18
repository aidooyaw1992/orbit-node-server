'use strict';
module.exports = (sequelize, DataTypes) => {
  const Attendee = sequelize.define('Attendee', {
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
  },
    fullName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      isEmail: true,
      len: [7, 100]
    },
    position: DataTypes.STRING,
    phone: DataTypes.STRING,
    organization: DataTypes.STRING,
    preCode: DataTypes.STRING,
    eventId: DataTypes.INTEGER,
    dateAttended1: DataTypes.DATE,
    dateAttended2: DataTypes.DATE,
    dateAttended3: DataTypes.DATE,
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
    },
  }, {});

  Attendee.associate = function(models) {
    Attendee.belongsTo(models.Event,{foreignKey:'eventId'});
  };

  return Attendee;
};