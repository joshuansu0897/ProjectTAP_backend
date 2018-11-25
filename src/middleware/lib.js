module.exports = {
  jwt: require('jsonwebtoken'),
  secret: require('crypto').randomBytes(256).toString('hex'),
}