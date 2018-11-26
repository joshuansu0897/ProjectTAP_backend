const request = require('supertest')
const app = require('../../../app')
const connection = require('../../connections')

afterAll(async () => {
  await connection.db.close()
})

beforeAll(async () => {
  await connection.db.authenticate()
})

describe('Test the signin path', () => {
  test('failed try sign in, user not exist', async () => {

    const response = await request(app)
      .get('/note')

    expect(response.statusCode).toBe(401)
    expect(response.body).toEqual({ error: { msg: 'No token!' } })
  });
})
