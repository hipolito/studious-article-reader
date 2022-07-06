module.exports = (res, error) => {
    res.status(error.response.status).send(JSON.stringify({
        status: error.response.status,
        msg: error.message
    }))
}
