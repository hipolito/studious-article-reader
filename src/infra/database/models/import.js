'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Import extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  Import.init({
    importDate: DataTypes.DATE,
    rawContent: 'TEXT(65500)'
  }, {
    sequelize,
    modelName: 'Import',
  });
  return Import;
};