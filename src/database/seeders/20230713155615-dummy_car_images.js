'use strict';

/** @type {import('sequelize-cli').Migration} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { generateCarImages } = require('../database_dummy');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('car_images', await generateCarImages());
  },
  down: async (queryInterface, Sequelize) => {
    // await queryInterface.bulkDelete('user_roles', null, {});
  },
};
