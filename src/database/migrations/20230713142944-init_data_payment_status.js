'use strict';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const constants = require('../database_constant');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'payment_statuses',
      constants.payment_status.map((status) => ({
        status,
      })),
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('payment_statuses', null, {});
  },
};
