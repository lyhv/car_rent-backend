'use strict';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const constants = require('../database_constant');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'rental_statuses',
      constants.rental_statuses.map((status) => ({
        status,
      })),
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('rental_statuses', null, {});
  },
};
