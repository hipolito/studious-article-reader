const { Sequelize, DataTypes } = require('sequelize')
const ArticleEntity = require('../../../entities/Article.entity')
const Article = require('../../../../infra/database/models/article')
const { database, username, password, host, port, dialect } = require('../../../../infra/config/database').development

module.exports = async function getArticles() {
    const sequelize = new Sequelize(database, username, password, { host, dialect, port })
    await sequelize.authenticate();
    const articleClient = Article(sequelize, DataTypes)
    return processResponse(await articleClient.findAll());
}

function processResponse(articles){
    let listOfArticles = []
    
    articles.forEach(article => {
        listOfArticles.push(new ArticleEntity(article.dataValues))
        
    });
    return listOfArticles
}