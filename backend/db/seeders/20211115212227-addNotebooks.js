'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     return queryInterface.bulkInsert('Notebooks', [
      {
        userId: 1,
        title: "First",
        bannerPicUrl: "http://www.pixelstalk.net/wp-content/uploads/2016/09/Download-All-White-Image.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        title: "Second",
        bannerPicUrl: "http://www.pixelstalk.net/wp-content/uploads/2016/09/Download-All-White-Image.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        title: "Third",
        bannerPicUrl: "http://www.pixelstalk.net/wp-content/uploads/2016/09/Download-All-White-Image.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Notebooks', null, {});
  }
};
