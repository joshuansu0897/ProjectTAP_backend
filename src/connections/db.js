const Sequelize = require('sequelize')

const name = process.env.NAME_DB || 'ExampleDB'
const user = process.env.USER_DB || 'root'
const pass = process.env.PASS_DB || 'toor'
const host = process.env.HOST_DB || 'localhost'
const type = process.env.TYPE_DB || 'mysql'
const port = process.env.PORT_DB || 3306

const sequelize = new Sequelize(name, user, pass, {
  host: host,
  dialect: type,
  port: port,
  logging: console.log,
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
})

module.exports = sequelize