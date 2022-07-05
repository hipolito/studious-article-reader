module.exports = {
    development: {
        database: 'database',
        username: 'root',
        password: null,
        host: 'localhost',
        port: 3306,
        dialect: 'mysql'
    },
    production: {
        database: 'database',
        username: 'root',
        password: null,
        host: '127.0.0.1',
        port: 3306,
        dialect: 'mysql'
    }
}