'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.createTable('Users', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        firstName: {
          type: Sequelize.STRING
        },
        lastName: {
          type: Sequelize.STRING
        },
        position: {
          type: Sequelize.STRING
        },
        company: {
          type: Sequelize.STRING
        },
        email: {
          type: Sequelize.STRING,
          unique: true
        },
        password: {
          type: Sequelize.STRING,
          unique: true
        },
        username: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        isAdmin: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      }),


    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};