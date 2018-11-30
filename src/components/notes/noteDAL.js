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

  try {
    if (note.id) {
      response = await Note.update(note, { where: { id: note.id } })
      response = await this.findById({ id: note.id, userId: note.userId })
    } else {
      response = await Note.create(note)
      response = response ? response.dataValues : null
    }
  } catch (error) {
    response = {}
    response.error = error.message
  }

  return response
}

exports.delete = async (obj) => {
  const id = obj.id
  const userId = obj.userId

  let response
  try {
    response = await Note.destroy({ where: { id, userId } })
  } catch (error) {
    response = {}
    response.error = error.message
  }

  return response
}

exports.findById = async (obj) => {
  const id = obj.id
  const userId = obj.userId

  let response
  try {
    response = await Note.findOne({ where: { id, userId } })
    response = response ? response.dataValues : null
  } catch (error) {
    response = {}
    response.error = error.message
  }

  return response
}
