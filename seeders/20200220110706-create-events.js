'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Events', [{
      name : 'EduAfic',
      locationId : 2,
      ownerId: 2,
      startDate: "2020-01-17T15:18:00.000Z",
      endDate: "2020-02-17T15:18:00.000Z",
      createdAt : new Date(),
      updatedAt : new Date(),
    }],{});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Events', null, {});
  }
};
