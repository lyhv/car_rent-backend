'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add indexes to the specified columns
    await queryInterface.addIndex('cars', ['car_type_id']);
    await queryInterface.addIndex('cars', ['capacity']);
    await queryInterface.addIndex('cars', ['steering']);
    await queryInterface.addIndex('cars', ['name']);
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the indexes on the specified columns in the reverse order
    await queryInterface.removeIndex('cars', ['name']);
    await queryInterface.removeIndex('cars', ['steering']);
    await queryInterface.removeIndex('cars', ['capacity']);
    await queryInterface.removeIndex('cars', ['car_type_id']);
  },
};
