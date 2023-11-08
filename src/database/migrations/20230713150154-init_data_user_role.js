'use strict';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const constants = require('../database_constant');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'user_roles',
      constants.user_role.map((role) => ({
        role,
      })),
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user_roles', null, {});
  },
};
