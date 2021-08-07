const bcrypt = require('bcrypt');
require('dotenv').config();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const salt = bcrypt.genSaltSync(10);
    await queryInterface.bulkInsert('Admins', [{
      username: process.env.DEFAULT_ADMIN_USERNAME,
      password: bcrypt.hashSync(process.env.DEFAULT_ADMIN_PASSWORD, parseInt(salt, 10)),
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Admins', null, {});
  },
};
