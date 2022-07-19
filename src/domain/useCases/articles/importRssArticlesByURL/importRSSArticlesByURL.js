const crypto = require('crypto')
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

        return xml2js.parseStringPromise(rssSiteRequest.data).then(result => {
            const articles = result.rss.channel[0].item
            importDAO.create({ importDate: new Date(), rawContent: articles })

            articles.forEach(article => {
                articleDAO.upsert({
                    externalId: crypto.createHash('md5').update(JSON.stringify(article.guid[0])).digest('hex'),
                    importDate: new Date(),
                    title: article.title[0],
                    description: article.description[0],
                    publicationDate: article.pubDate[0],
                    link: article.link[0],
                    mainPicture: JSON.stringify(article["media:content"][0])
                })
            })
            return {
                status: 204,
                msg: `File ${siteRssUrl} imported with success`
            }
        }).catch(function (err) {
            throw err
        })
    }
}