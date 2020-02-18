'use strict';



module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
  },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    position: DataTypes.STRING,
    company: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      isEmail: true,
      len: [7, 100]
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
  },{
    getterMethods: {
      fullName() {
        return this.firstName + ' ' + this.lastName;
      }
    },
  }
 
  );

  User.associate = function(models) {
    User.hasMany(models.Event, {foreignKey: 'ownerId'});
  };
  return User;
};