'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.product.belongsToMany(models.user, { through:"user_product"})
    }
  };
  product.init({
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
    modelName: 'product',
  });
  return product;
};