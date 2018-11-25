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

    if (!response) {
      res.status(500)
      res.json({ error: { msg: 'error al guardar' } })
      return
    }

    res.json({ response })
  })
  .get(async (req, res) => {

    console.log(req.baseUrl);
    console.log(req.query);
    console.log(req.url);
    console.log(req.originalUrl);
    console.log(req.hostname);
    console.log(req.path);
    console.log(req.ip);
    

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

    let next
    if (count > obj.limit) {
      next = `http://localhost:3000/note?offset=${obj.limit}&limit=${obj.limit + 10}`
    } else {
      next = null
    }

    let previous
    if (obj.offset !== 0) {
      previous = `http://localhost:3000/note?offset=${obj.offset - 10}&limit=${obj.offset}`
    } else {
      previous = null
    }

    res.json({
      count,
      previous,
      next,
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

    if (!response) {
      res.status(500)
      res.json({ error: { msg: `error al buscar la nota con id:${obj.id}` } })
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

    if (!response) {
      res.status(500)
      res.json({ error: { msg: 'error al actualizar' } })
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

    if (!response) {
      res.status(500)
      res.json({ error: { msg: 'error al borrar' } })
      return
    }

    res.json({ msg: 'delete successful ' })
  })

module.exports = router;