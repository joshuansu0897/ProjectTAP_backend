const lib = require('./lib');

module.exports = (req, res, next) => {
  if (req.url === '/signin' || req.url === '/signup') {
    next()
    return
  }

  let token = req.headers['authorization']

  if (!token) {
    res.status(401)
    res.json({ error: { msg: 'No token! :D' } })
    return
  }

  try {
    req.user = lib.jwt.verify(token, lib.secret)
    next()
  } catch (error) {
    res.status(401)
    res.json({ error: { msg: 'Failed to authenticate token!' } })
  }
};