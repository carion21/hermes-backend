'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Requests', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      code: {
        type: Sequelize.STRING
      },
      subject: {
        type: Sequelize.TEXT
      },
      requesttype_id: {
        type: Sequelize.INTEGER
      },
      client_id: {
        type: Sequelize.INTEGER
      },
      main_stage_id: {
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
    await queryInterface.dropTable('Requests');
  }
};