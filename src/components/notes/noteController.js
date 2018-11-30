const router = require('express').Router()
const NoteDAL = require('./noteDAL')

router.route('/note')
  .post(async (req, res) => {

    let obj = {
      content: req.body.content,
      title: req.body.title,
      userId: req.user.id
    }

    let response = await NoteDAL.save(obj)

    if (response.error) {
      res.status(500)
      res.json({ error: { msg: response.error } })
      return
    }

    res.json({ response })
  })
  .get(async (req, res) => {

    let obj = {
      offset: Number(req.query.offset ? req.query.offset : 0),
      limit: Number(req.query.limit ? req.query.limit : 10),
      userId: Number(req.user.id)
    }

    let response = await NoteDAL.findAll(obj)

    if (!response) {
      res.status(500)
      res.json({ error: { msg: 'error al buscar las notas' } })
      return
    }

    let count = response.count
    response = response.response

    res.json({
      count,
      response
    })
  })

router.route('/note/:id')
  .get(async (req, res) => {

    let obj = {
      id: req.params.id,
      userId: req.user.id
    }

    let response = await NoteDAL.findById(obj)

    if (response.error) {
      res.status(500)
      res.json({ error: { msg: response.error } })
      return
    }

    res.json({ response })
  })
  .put(async (req, res) => {

    let obj = {
      content: req.body.content,
      title: req.body.title,
      id: req.params.id,
      userId: req.user.id
    }

    let response = await NoteDAL.save(obj)

    if (response.error) {
      res.status(500)
      res.json({ error: { msg: response.error } })
      return
    }

    res.json({ response })
  })
  .delete(async (req, res) => {

    let obj = {
      id: req.params.id,
      userId: req.user.id
    }

    let response = await NoteDAL.delete(obj)

    if (response.error) {
      res.status(500)
      res.json({ error: { msg: response.error } })
      return
    }

    res.json({ msg: 'deleted successfully' })
  })

module.exports = router;