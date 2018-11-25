const connection = require('../../connections')
const Sequelize = require('sequelize')

const Notes = connection.db.define('notes', {
  title: { type: Sequelize.STRING, allowNull: false },
  content: Sequelize.TEXT
});

connection.db.sync()

module.exports = Notes;