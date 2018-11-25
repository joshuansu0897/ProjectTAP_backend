const User = require('./user')

exports.findByUsername = async (username) => {
  let response = await User.findOne({ where: { username } })
  return response ? response.dataValues : null
}

exports.save = async (user) => {
  let response = await User.create(user)
  return response.dataValues
}