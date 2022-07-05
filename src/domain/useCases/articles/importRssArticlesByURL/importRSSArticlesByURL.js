const axios = require('axios')
const { parseString } = require('xml2js');
const { Sequelize, DataTypes } = require('sequelize')
const Import = require('../../../../infra/database/models/import')
const Article = require('../../../../infra/database/models/article')
const { database, username, password, host, port, dialect } = require('../../../../infra/config/database').development

module.exports = async function ImportRSSArticlesByURL({ siteRssUrl }) {
    if (siteRssUrl) {
        const { data } = await axios.get(siteRssUrl)

        const sequelize = new Sequelize(database, username, password, { host, dialect, port })
        await sequelize.authenticate();

        const importClient = Import(sequelize, DataTypes)
        const articleClient = Article(sequelize, DataTypes)


        await parseString(data, async function (err, result) {
            await importClient.create({ importDate: new Date(), rawContent: JSON.stringify(result.rss.channel[0].item) })
            const articles = result.rss.channel[0].item
            articles.forEach(article => {
                articleClient.create({
                    externalId: JSON.stringify(article.guid[0]),
                    importDate: new Date(),
                    title: article.title[0],
                    description: article.description[0],
                    publicationDate: article.pubDate[0],
                    link: article.link[0],
                    mainPicture: JSON.stringify(article["media:content"][0])
                })
            })
        })
    }
    return siteRssUrl
}