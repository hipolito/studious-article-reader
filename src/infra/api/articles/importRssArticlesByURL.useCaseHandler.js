const importRSSArticlesByURL = require("../../../domain/useCases/articles/importRssArticlesByURL/importRSSArticlesByURL")

module.exports = (req, res) => {
    return importRSSArticlesByURL(req.query)
}
