const bodyParser = require('body-parser')

module.exports = (expressServer) => {
    expressServer.use(bodyParser.json())
}