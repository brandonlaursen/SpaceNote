'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     return queryInterface.bulkInsert('Notebooks', [
      {
        userId: 1,
        title: "First",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        title: "Second",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        title: "Third",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        title: "First",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        title: "Second",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        title: "Third",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        title: "First",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        title: "Second",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        title: "Third",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Notebooks', null, {});
  }
};
