const { Sequelize, DataTypes } = require('sequelize')
const Article = require('../../../../infra/database/models/article')
const { database, username, password, host, port, dialect } = require('../../../../infra/config/database').development

module.exports = async function getArticles() {
    const sequelize = new Sequelize(database, username, password, { host, dialect, port })
    
    await sequelize.authenticate();

    const articleClient = Article(sequelize, DataTypes)

    return articleClient.findAll();
}