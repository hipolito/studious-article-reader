module.exports = (res, error) => {
    res.status(error.response?.status || 500).send(JSON.stringify({
        status: error.response?.status || 500,
        msg: error.response? error.message : "internal server error"
    }))
}
