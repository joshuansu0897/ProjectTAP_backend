const Note = require('./note')

exports.findAll = async (obj) => {
  const offset = obj.offset
  const limit = obj.limit
  const userId = obj.userId

  let response = await Note.findAll({
    offset,
    limit,
    attributes: ['id', 'title'],
    where: { userId }
  })
  response = response.map(res => res.dataValues)

  let count = await Note.count({ where: { userId } })

  return { response, count }
}

exports.save = async (note) => {
  let response
  if (note.id) {
    response = await Note.update(note, { where: { id: note.id } })
    console.log(response);
  } else {
    response = await Note.create(note)
  }

  return response ? response.dataValues : null
}

exports.delete = async (obj) => {
  const id = obj.id
  const userId = obj.userId

  let response = await Note.destroy({ where: { id, userId } })
  return response ? response.dataValues : null
}

exports.findById = async (obj) => {
  const id = obj.id
  const userId = obj.userId

  let response = await Note.findOne({ where: { id, userId } })
  return response ? response.dataValues : null
}
