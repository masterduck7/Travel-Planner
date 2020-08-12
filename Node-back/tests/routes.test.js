const request = require('supertest')
const app = require('../app')

describe('Post Endpoints', () => {
  it('Should create a new trip', async () => {
    const res = await request(app)
      .post('/trips')
      .send({
        destination: 'Test destination',
        start_date: '2020-02-01',
        end_date: '2020-03-01',
        planning_file: 'test_file.xlsx',
        status: 'ACTIVE',
        userID: 1
      })
    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('trip')
  })
})