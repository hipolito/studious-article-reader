const { Sequelize } = require('sequelize')
const { database, username, password, host, dialect, port } = require('../config/database').development

module.exports = async () => {
  const sequelize = new Sequelize(database, username, password, { host, dialect, port })
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    let apiErroMessage = new Error('Unable to connect to the database');
    apiErroMessage['response'] = {status:500};
    throw apiErroMessage
  }

  return sequelize

}