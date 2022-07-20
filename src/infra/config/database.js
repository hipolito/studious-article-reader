module.exports = {
    development: {
        database: process.env.DATABASE_NAME || 'studious_article_reader_db',
        username: process.env.DATABASE_USER || 'root',
        password: process.env.DATABASE_PASSWORD || 'mysqlpw',
        host: process.env.DATABASE_HOST || 'localhost',
        port: process.env.DATABASE_PORT || 49154,
        dialect: process.env.DATABASE_DIALECT || 'mysql'
    },
    production: {
        database: process.env.DATABASE_NAME,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT,
        dialect: process.env.DATABASE_DIALECT
    }
}