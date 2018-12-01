const router = require('express').Router()
const UserDAL = require('./userDAL')
const bcrypt = require('bcrypt-nodejs')
const { jwt, secret } = require('../../middleware/lib')

router.post('/signin', async (req, res) => {
  let response = await UserDAL.findByUsername(req.body.username)

  if (!response) {
    res.status(404)
    res.json({ error: 'Invalid username' })
    return
  }

  let validPassword = bcrypt.compareSync(req.body.password, response.password)

  if (!validPassword) {
    res.status(404)
    res.json({ error: 'Invalid password' })
    return
  }

  let token = jwt.sign({ id: response.id }, secret, { expiresIn: '24h' })

  res.json({ token })
})

router.post('/signup', async (req, res) => {
  let username = req.body.username
  let password = req.body.password

  if (!username) {
    res.status(400)
    res.json({ error: 'Invalid username' })
    return
  }

  if (!password) {
    res.status(400)
    res.json({ error: 'Invalid password' })
    return
  }

  let response = await UserDAL.findByUsername(username)

  if (response) {
    res.status(409)
    res.json({ error: 'username was already taken' })
    return
  }

  let passwordCrypt = bcrypt.hashSync(password)

  response = await UserDAL.save({ username, password: passwordCrypt })

  if (response.error) {
    res.status(500)
    res.json({ error: response.error })
    return
  }

  res.json({ msg: 'created successfully' })
})

module.exports = router;