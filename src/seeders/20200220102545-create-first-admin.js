'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Users', [{
        firstName : 'Daniel',
        lastName : 'Aidoo',
        isAdmin : true,
        createdAt : new Date(),
        updatedAt : new Date(),
        email : 'aidoo@test.com',
        username: 'admin',
        password: 'admin'
      }],{});

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Users', null, {});
  }
};
