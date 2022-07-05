const express = require('express')
const { port } = require('../infra/config/server')
const importRssArticleByURL = require('../domain/useCases/articles/importRssArticlesByURL')
const getArticles = require('../domain/useCases/articles/getArticles')

const app = express()

app.post('/api/articles/import', (req, res) => {
    importRssArticleByURL(req.query);
    return res.send("Send a 200 here")
})

app.get('/api/articles', async (req, res) => {
    const result = await getArticles()
    return res.send(result)
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}...`)
})