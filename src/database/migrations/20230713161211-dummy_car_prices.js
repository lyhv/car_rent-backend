'use strict';

/** @type {import('sequelize-cli').Migration} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { dummyCarPrices } = require('../database_dummy');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('car_prices', await dummyCarPrices());
  },
  down: async (queryInterface, Sequelize) => {
    // await queryInterface.bulkDelete('user_roles', null, {});
  },
};
