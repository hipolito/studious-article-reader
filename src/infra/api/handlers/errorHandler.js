module.exports = (res, error) => {
    res.status(error.status).send(error.message)
}
