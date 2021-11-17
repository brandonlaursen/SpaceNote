'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Notebooks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Users' }
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(25)
      },
      bannerPicUrl: {
        allowNull: false,
        type: Sequelize.STRING(256),
        defaultValue: "http://www.pixelstalk.net/wp-content/uploads/2016/09/Download-All-White-Image.jpg",
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Notebooks');
  }
};