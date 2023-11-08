'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('payments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      rental_id: {
        type: Sequelize.INTEGER,
        unique: true,
      },
      payment_amount: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      payment_date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      payment_method_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      transaction_id: {
        type: Sequelize.INTEGER,
      },
      payment_status_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('payments');
  },
};
