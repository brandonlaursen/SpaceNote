'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     return queryInterface.bulkInsert('Notes', [
      {
        userId: 1,
        notebookId: 1,
        title: "My First Note",
        content: "Hello",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        notebookId: 1,
        title: "My Second Note",
        content: "Hello",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        notebookId: 1,
        title: "My Third Note",
        content: "Hello",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        notebookId: 4,
        title: "My First Note",
        content: "Hello",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        notebookId: 4,
        title: "My Second Note",
        content: "Hello",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        notebookId: 4,
        title: "My Third Note",
        content: "Hello",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        notebookId: 7,
        title: "My First Note",
        content: "Hello",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        notebookId: 7,
        title: "My Second Note",
        content: "Hello",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        notebookId: 7,
        title: "My Third Note",
        content: "Hello",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Notes', null, {});
  }
};
