const getArticles = require("../../../domain/useCases/articles/getArticles/getArticles")

module.exports = (req, res) => {
    return getArticles()
}