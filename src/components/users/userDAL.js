const User = require('./user')

exports.findByUsername = async (username) => {

  let response
  try {
    response = await User.findOne({ where: { username } })
    response = response ? response.dataValues : null
  } catch (error) {
    response = {}
    response.error = error.message
  }

  return response
}

exports.save = async (user) => {

  let response
  try {
    response = await User.create(user)
    response = response ? response.dataValues : null
  } catch (error) {
    response = {}
    response.error = error.message
  }

  return response
}