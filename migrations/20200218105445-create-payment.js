'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Payments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      eventId: {
        type: Sequelize.INTEGER
      },
      ownerId: {
        type: Sequelize.INTEGER
      },
      amount: {
        type: Sequelize.REAL
      },
      paymentType: {
        type: Sequelize.STRING
      },
      // paymentType: {
      //   type: Sequelize.ARRAY(Sequelize.ENUM),
      //   values: ['CASH', 'MOMO', 'CARD']
      // },
      transactionNumber: {
        type: Sequelize.TEXT
      },
      paidDate: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Payments');
  }
};