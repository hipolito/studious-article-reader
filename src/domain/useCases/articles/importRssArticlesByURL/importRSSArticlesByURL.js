const axios = require('axios')
const { parseString } = require('xml2js');
const { Sequelize, DataTypes } = require('sequelize')
const { Import, Article } = require('../../../../infra/database/models')
const { database, username, password, host, port, dialect } = require('../../../../infra/config/database').development

module.exports = async function ImportRSSArticlesByURL({ siteRssUrl }) {
    if (siteRssUrl) {
        const { data } = await axios.get(siteRssUrl)

        const sequelize = new Sequelize(database, username, password, { host, dialect, port })
        
        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
          } catch (error) {
            console.error('Unable to connect to the database:', error);
        }

        const importClient = Import(sequelize, DataTypes)
        const articleClient = Article(sequelize, DataTypes)


        await parseString(data, async function (err, result) {
            if (err) throw err
            let articlesRawData = result.rss.channel[0].item
            let rawInput = ""
            articlesRawData.forEach(async (article) => {
                let articleStringfied = JSON.stringify(article)
                if (rawInput.length + articleStringfied.length < 16001) {
                    rawInput += articleStringfied + ","
                } else {
                    await importClient.create({ importDate: new Date(), rawContent: rawInput })
                    rawInput = articleStringfied
                }
            })

            const articles = result.rss.channel[0].item
            articles.forEach(article => {
                articleClient.upsert({
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

}