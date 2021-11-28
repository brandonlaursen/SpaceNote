'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     return queryInterface.bulkInsert('Notebooks', [
      {
        userId: 1,
        title: "Astronomy",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        title: "Coding",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        title: "Math",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        title: "Science",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        title: "To Do",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        title: "History",
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
