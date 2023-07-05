'use strict';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const constants = require('../database_constant');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'payment_method',
      constants.payment_method.map((method) => ({
        method,
      })),
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('payment_method', null, {});
  },
};
