const express = require('express')
const { port } = require('../infra/config/server')
const router = require('./server/router')
const configureMiddlewares = require('./server/middlewares')

const app = express()

configureMiddlewares(app)
app.use(router())

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})