'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Product.belongsTo(models.User)
    }
  };
  Product.init({
    name: DataTypes.STRING,
    thumbnailImage: DataTypes.STRING,
    regularPrice: DataTypes.FLOAT,
    salePrice: DataTypes.FLOAT,
    description: DataTypes.STRING,
    customerTopRated: DataTypes.BOOLEAN,
    mediumImage: DataTypes.STRING,
    addToCartUrl: DataTypes.STRING,
    longDescription: DataTypes.STRING,
    color: DataTypes.STRING,
    condition: DataTypes.STRING,
    largeImage: DataTypes.STRING,
    modelNumber: DataTypes.STRING,
    percentSavings: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};