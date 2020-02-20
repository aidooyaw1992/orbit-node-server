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
        title: {
          type: Sequelize.STRING
        },
        firstName: {
          type: Sequelize.STRING
        },
        lastName: {
          type: Sequelize.STRING
        },
        otherName: {
          type: Sequelize.STRING
        },
        fullName: {
          type: Sequelize.STRING
        },
        nationality: {
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
        amount: Sequelize.REAL,
        heardAboutUs: {
          type: Sequelize.TEXT
        },
        CountryOfResidence: {
          type: Sequelize.STRING
        },
        preCode: {
          type: Sequelize.STRING
        },
        eventId: {
          type: Sequelize.INTEGER
        },
        ownerId: {
          type: Sequelize.INTEGER
        },
        isVerified: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
        },
        paid: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
        },
        macAddress: {
          type: Sequelize.STRING
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