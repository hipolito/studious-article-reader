const axios = require('axios')
const xml2js = require('xml2js');
const { DataTypes } = require('sequelize')
const { Import, Article } = require('../../../../infra/database/models')
const sequelizeStart = require('../../../../infra/database/init')

module.exports = async function ImportRSSArticlesByURL({ siteRssUrl }) {
    if (siteRssUrl) {
        const rssSiteRequest = await axios.get(siteRssUrl)
        const sequelize = await sequelizeStart()
        const importDAO = Import(sequelize, DataTypes)
        const articleDAO = Article(sequelize, DataTypes)

        return xml2js.parseStringPromise(rssSiteRequest.data).then(function (result) {
            let articlesRawData = result.rss.channel[0].item
            let rawInput = ""
            articlesRawData.forEach(async (article) => {
                let articleStringfied = JSON.stringify(article)
                if (rawInput.length + articleStringfied.length < 16001) {
                    rawInput += articleStringfied + ","
                } else {
                    await importDAO.create({ importDate: new Date(), rawContent: rawInput })
                    rawInput = articleStringfied
                }
            })

            const articles = result.rss.channel[0].item
            articles.forEach(article => {
                articleDAO.upsert({
                    externalId: JSON.stringify(article.guid[0]),
                    importDate: new Date(),
                    title: article.title[0],
                    description: article.description[0],
                    publicationDate: article.pubDate[0],
                    link: article.link[0],
                    mainPicture: JSON.stringify(article["media:content"][0])
                })
            })
            return JSON.stringify({
                status: 204,
                msg: `File ${siteRssUrl} imported with success`
            })
        })
        .catch(function (err) {
                return JSON.stringify({
                    status: 422,
                    msg: `File ${siteRssUrl} is an invalid xml`
                })
            })
    }
}