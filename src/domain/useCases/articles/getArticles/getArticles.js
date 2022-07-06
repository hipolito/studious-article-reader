const { DataTypes } = require('sequelize')
const ArticleEntity = require('../../../entities/Article.entity')
const ArticleDAO = require('../../../../infra/database/models/article')
const sequelize = require('../../../../infra/database/init')

module.exports = async function getArticles() {
    const articleDAO = ArticleDAO(await sequelize(), DataTypes)
    return processResponse(await articleDAO.findAll());
}

function processResponse(articles){
    let listOfArticles = []
    articles.forEach(article => listOfArticles.push(new ArticleEntity(article.dataValues)));
    return listOfArticles
}