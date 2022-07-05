'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Articles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      externalId: {
        type: Sequelize.TEXT
      },
      importDate: {
        type: Sequelize.DATE
      },
      title: {
        type: Sequelize.TEXT
      },
      description: {
        type: Sequelize.TEXT
      },
      publicationDate: {
        type: Sequelize.DATE
      },
      link: {
        type: Sequelize.TEXT
      },
      mainPicture: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('Articles');
  }
};