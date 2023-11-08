'use strict';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const constants = require('../database_constant');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'car_types',
      constants.car_type.map((type) => ({
        type,
      })),
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('car_types', null, {});
  },
};
