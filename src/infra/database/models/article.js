'use strict';
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  
  Article.init({
    externalId:{
      type: 'VARCHAR(500)',
      unique: true
    },
    importDate: DataTypes.DATE,
    title: DataTypes.TEXT,
    description: DataTypes.TEXT,
    publicationDate: DataTypes.DATE,
    link: DataTypes.TEXT,
    mainPicture: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
};