const connection = require('../../connections')
const Sequelize = require('sequelize')

const User = connection.db.define('user', {
  username: { type: Sequelize.STRING, allowNull: false },
  password: { type: Sequelize.STRING, allowNull: false }
})

User.hasMany(require('../notes').model, { as: 'note' })

connection.db.sync()

module.exports = User;