const request = require('supertest')
const app = require('../appTest')
const http = require('http');

describe('Trip tests', () => {
    let server;
    let tokenAuth = null;

    beforeAll(done => {
        server = http.createServer(app);
        server.listen(done);
    });

    afterAll(done => {
        server.close(done);
    });

    it('Get all users without auth', async () => {
        const res = await request(server)
        .get('/users')
        expect(res.statusCode).toEqual(401)
    })

    it('Get all trips without auth', async () => {
        const res = await request(server)
        .get('/trips')
        expect(res.statusCode).toEqual(401)
    })

    it('Get all flights without auth', async () => {
        const res = await request(server)
        .get('/flights')
        expect(res.statusCode).toEqual(401)
    })

    it('Get all cities without auth', async () => {
        const res = await request(server)
        .get('/cities')
        expect(res.statusCode).toEqual(401)
    })

    it('Get all hotels without auth', async () => {
        const res = await request(server)
        .get('/hotels')
        expect(res.statusCode).toEqual(401)
    })

    it('Get all activities without auth', async () => {
        const res = await request(server)
        .get('/activities')
        expect(res.statusCode).toEqual(401)
    })

    it('Get all costs without auth', async () => {
        const res = await request(server)
        .get('/costs')
        expect(res.statusCode).toEqual(401)
    })

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

    it('Create a new user without permission level required', async () => {
        const res = await request(server)
        .post('/users')
        .set({ Authorization: 'Bearer ' + tokenAuth })
        .send({
            username: 'Test user',
            password: 'Testing',
            email: 'test@lpsoftware.space',
            country: 'CL',
            visitedCountries: 'CL',
            permissionLevel: 1,
            userLogged: 'tester'
        })
        expect(res.statusCode).toEqual(400)
    })
})