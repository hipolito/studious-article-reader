const { Sequelize } = require('sequelize')
const { database, username, password, host, dialect } = require('../config/database')

module.exports = async () => {
    const sequelize = new Sequelize(database, username, password, { host, dialect })

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

    return sequelize

}