'use strict';
module.exports = (sequelize, DataTypes) => {
  const Attendee = sequelize.define('Attendee', {
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
  },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    otherName: DataTypes.STRING,
    nationality: DataTypes.STRING,
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
    ownerId: DataTypes.INTEGER,
    dateAttended1: DataTypes.DATE,
    dateAttended2: DataTypes.DATE,
    dateAttended3: DataTypes.DATE,
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    heardAboutUs: {
      type: DataTypes.TEXT
    },
    CountryOfResidence: {
      type: DataTypes.STRING
    },
    paid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    macAddress: {
      type: DataTypes.STRING
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
    Attendee.belongsTo(models.User,{foreignKey:'ownerId'});
  };

  return Attendee;
};