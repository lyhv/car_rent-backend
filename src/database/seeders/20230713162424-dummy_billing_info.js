'use strict';

/** @type {import('sequelize-cli').Migration} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { generateDummyBillingInfos } = require('../database_dummy');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'billing_infos',
      generateDummyBillingInfos(),
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
