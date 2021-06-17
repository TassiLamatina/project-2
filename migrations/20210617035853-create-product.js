'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      thumbnailImage: {
        type: Sequelize.STRING
      },
      regularPrice: {
        type: Sequelize.FLOAT
      },
      salePrice: {
        type: Sequelize.FLOAT
      },
      description: {
        type: Sequelize.STRING
      },
      customerTopRated: {
        type: Sequelize.BOOLEAN
      },
      mediumImage: {
        type: Sequelize.STRING
      },
      addToCartUrl: {
        type: Sequelize.STRING
      },
      longDescription: {
        type: Sequelize.STRING
      },
      color: {
        type: Sequelize.STRING
      },
      condition: {
        type: Sequelize.STRING
      },
      largeImage: {
        type: Sequelize.STRING
      },
      modelNumber: {
        type: Sequelize.STRING
      },
      percentSavings: {
        type: Sequelize.FLOAT
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  }
};