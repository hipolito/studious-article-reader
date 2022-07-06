const RouteBuilder = require("../routeBuilder")

module.exports = () => {
    const articlesEndpoint = new RouteBuilder()

    articlesEndpoint.get('/', require('./getArticles.useCaseHandler'))
    
    articlesEndpoint.post('/import', require('./importRssArticlesByURL.useCaseHandler'))

    return articlesEndpoint.build()
}