'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      code: {
        type: Sequelize.STRING
      },
      username: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      firstname: {
        type: Sequelize.STRING
      },
      lastname: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      confirmation_token: {
        type: Sequelize.TEXT
      },
      confirmation_code: {
        type: Sequelize.STRING
      },
      confirmation_expiration: {
        type: Sequelize.STRING
      },
      reset_token: {
        type: Sequelize.TEXT
      },
      reset_code: {
        type: Sequelize.STRING
      },
      reset_expiration: {
        type: Sequelize.STRING
      },
      entity_id: {
        type: Sequelize.INTEGER
      },
      profile_id: {
        type: Sequelize.INTEGER
      },
      created_by: {
        type: Sequelize.INTEGER
      },
      enable: {
        type: Sequelize.INTEGER
      },
      delete: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};