'use strict';
const faker = require("faker");
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        profile_pic_url: 'https://avatarfiles.alphacoders.com/127/127499.jpg',
        dark_mode: false,
      },
      {
        email: faker.internet.email(),
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        profile_pic_url: 'https://avatarfiles.alphacoders.com/127/127499.jpg',
        dark_mode: false,
      },
      {
        email: faker.internet.email(),
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        profile_pic_url: 'https://avatarfiles.alphacoders.com/127/127499.jpg',
        dark_mode: false,
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
