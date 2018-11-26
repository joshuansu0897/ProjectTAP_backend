const request = require('supertest')
const app = require('../../../app')
const connection = require('../../connections')

afterAll(async () => {
  await connection.db.close()
})

beforeAll(async () => {
  await connection.db.authenticate()
})

describe('Test the sign in and up path', () => {
  test('failed try sign in, user not exist', async () => {

    let user = {
      username: 'notExist',
      password: 'test'
    }

    const response = await request(app)
      .post('/signin')
      .send(user)

    expect(response.statusCode).toBe(404)
    expect(response.body).toEqual({ error: { msg: 'Invalid username' } })
  })

  test('failed try sign up, empty obj', async () => {

    let user = {}

    const response = await request(app)
      .post('/signup')
      .send(user)

    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({ error: { msg: 'Invalid username' } })
  })

  test('Sign up, good', async () => {

    let user = {
      username: 'test',
      password: '12345'
    }

    const response = await request(app)
      .post('/signup')
      .send(user)

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({ msg: 'created successfully' })
  })

  test('Sign up, username was already taken', async () => {

    let user = {
      username: 'test',
      password: '12345'
    }

    const response = await request(app)
      .post('/signup')
      .send(user)

    expect(response.statusCode).toBe(409)
    expect(response.body).toEqual({ error: { msg: 'username was already taken' } })
  })
})
