'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('rentals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      car_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      car_price_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      billing_info_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      payment_id: {
        type: Sequelize.INTEGER,
        unique: true,
      },
      location_pick_up_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      location_drop_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      rental_start_date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      rental_end_date: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      return_date: {
        type: Sequelize.DATE,
      },
      rental_status_id: {
        allowNull: false,
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
    await queryInterface.dropTable('rentals');
  },
};
