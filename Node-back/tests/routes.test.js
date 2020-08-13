const request = require('supertest')
const app = require('../appTest')
const http = require('http')
const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiYWRtaW5AbHBzb2Z0d2FyZS5zcGFjZSIsInVzZXJuYW1lIjoiYWRtaW4iLCJjb3VudHJ5IjoiQ0wiLCJwZXJtaXNzaW9uTGV2ZWwiOjEwLCJyZWZyZXNoS2V5IjoiYkd2WmtWNnlqTTVNRGFwUUVFclNFQT09IiwiaWF0IjoxNTk3MzM2ODkyLCJleHAiOjE1OTc0MjMyOTJ9.X9GVV12jVz8hbC5J6G1hDmQYHpSPRzlmtP1ZPYsGW7A"

describe('Post Endpoints', () => {
  let server;
  beforeAll(done => {
    server = http.createServer(app);
    server.listen(done);
  });
  afterAll(done => {
    server.close(done);
  });
  it('Should create a new trip', async () => {
    const res = await request(server)
      .post('/trips')
      .set({ Authorization: token })
      .send({
        destination: 'Test destination',
        start_date: '2020-02-01',
        end_date: '2020-03-01',
        planning_file: 'test_file.xlsx',
        status: 'ACTIVE',
        userID: 1
      })
      expect(res.statusCode).toEqual(201)
  })
})