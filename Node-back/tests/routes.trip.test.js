const request = require('supertest')
const app = require('../appTest')
const http = require('http')

describe('Auth', () => {
  let server;
  let tokenAuth = ""

  beforeAll(done => {
    server = http.createServer(app);
    server.listen(done);
  });

  afterAll(done => {
    server.close(done);
  });

  it('Get Token auth', async () => {
    const res = await request(server)
      .post('/auth/')
      .send({
        username: process.env.SEED_SUPERUSER_USERNAME,
        password: process.env.SEED_SUPERUSER_PASSWORD
      })
    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('accessToken')
    tokenAuth = res.body.accessToken
  })

  it('Get all trips', async () => {
    const res = await request(server)
      .get('/trips')
      .set({ Authorization: 'Bearer ' + tokenAuth })
      expect(res.statusCode).toEqual(200)
  })

  it('Should create a new trip', async () => {
    const res = await request(server)
      .post('/trips')
      .set({ Authorization: 'Bearer ' + tokenAuth })
      .send({
        destination: 'Test destination',
        start_date: '2020-02-01',
        end_date: '2020-03-01',
        planning_file: 'test_file.xlsx',
        status: 'ACTIVE',
        userID: 1
      })
      expect(res.statusCode).toEqual(201)
      expect(res.body).toHaveProperty('destination')
  })
})