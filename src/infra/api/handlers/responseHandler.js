module.exports = (res, output) => {
    res.status(output.status).send(output.msg)
}
