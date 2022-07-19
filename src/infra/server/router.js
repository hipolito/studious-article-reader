const { Router } = require('express')
const articlesRouter = require('../api/articles/articles.router')

const configureRouter = () => {
    const router = new Router()
    router.use('/api/articles', articlesRouter())
    return router
}

module.exports = configureRouter