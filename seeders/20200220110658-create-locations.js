'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Locations', [{
        name: 'Peduase Lodge',
        region: 'Eastern Region',
        town: 'Peduase',
        createdAt : new Date(),
        updatedAt : new Date(),
      }], {});

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Locations', null, {});
  }
};
