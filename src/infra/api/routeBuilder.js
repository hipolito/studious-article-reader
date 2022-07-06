const { Router } = require("express");
const responseHandler = require("./handlers/responseHandler")
const errorHandler = require("./handlers/responseHandler")

class RouteBuilder {
    constructor() {
        Object.assign(this, {
            router: new Router(),
            responseHandler,
            errorHandler
        })
    }

    standardCallback(useCaseHandler) {
        return (req, res) => {
            return useCaseHandler(req, res)
                .then(result => this.responseHandler(res, result))
                .catch(error => this.errorHandler(res, error))
        }
    }

    get(routePath, useCaseHandler) {
        this.router.get(routePath, this.standardCallback(useCaseHandler))
    }

    post(routePath, useCaseHandler) {
        this.router.post(routePath, this.standardCallback(useCaseHandler))
    }

    build() {
        return this.router
    }
}

module.exports = RouteBuilder