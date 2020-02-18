'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([

      queryInterface.createTable('Attendees', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        fullName: {
          type: Sequelize.STRING
        },
        email: {
          type: Sequelize.STRING
        },
        position: {
          type: Sequelize.STRING
        },
        phone: {
          type: Sequelize.STRING
        },
        organization: {
          type: Sequelize.STRING
        },
        preCode: {
          type: Sequelize.STRING
        },
        eventId: {
          type: Sequelize.INTEGER
        },
        isVerified: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
        },
        dateAttended1: Sequelize.DATE,
        dateAttended2: Sequelize.DATE,
        dateAttended3: Sequelize.DATE,
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      })

    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Attendees');
  }
};