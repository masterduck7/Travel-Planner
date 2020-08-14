const request = require('supertest')
const app = require('../appTest')
const http = require('http');

describe('Users tests', () => {
    let server;
    let tokenAuth = null;
    let userCreated = null;

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

    it('Create a new user', async () => {
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
            userLogged: process.env.SEED_SUPERUSER_USERNAME
        })
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty('username')
        userCreated = res.body.id
    })

    it('Get one user', async () => {
        const res = await request(server)
        .get('/users/' + userCreated)
        .set({ Authorization: 'Bearer ' + tokenAuth })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('username')
    })

    it('Edit user', async () => {
        const res = await request(server)
        .put('/users/' + userCreated)
        .set({ Authorization: 'Bearer ' + tokenAuth })
        .send({
            username: 'username edited'
        })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toBe('User was updated successfully.')
    })

    it('Remove user', async () => {
        const res = await request(server)
        .delete('/users/'+ userCreated)
        .set({ Authorization: 'Bearer ' + tokenAuth })
        expect(res.statusCode).toEqual(200)
    })

    it('Get all users', async () => {
        const res = await request(server)
        .get('/users')
        .set({ Authorization: 'Bearer ' + tokenAuth })
        expect(res.statusCode).toEqual(200)
    })
})