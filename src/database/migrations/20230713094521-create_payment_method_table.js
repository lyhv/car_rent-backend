'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('payment_method', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      method: {
        allowNull: false,
        unique: true,
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal(
          'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
        ),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('payment_method');
  },
};
