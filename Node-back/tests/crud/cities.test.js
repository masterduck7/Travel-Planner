const request = require('supertest')
const app = require('../../appTest')
const http = require('http');

describe('Cities tests', () => {
    let server;
    let tokenAuth = null;
    let cityCreated = null;

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

    it('Create a new city', async () => {
        const res = await request(server)
        .post('/cities')
        .set({ Authorization: 'Bearer ' + tokenAuth })
        .send({
            name: 'Test city',
            country: 'CL',
            map_link: 'map.xlsx',
            tripID: 1
        })
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty('name')
        cityCreated = res.body.id
    })

    it('Get one city', async () => {
        const res = await request(server)
        .get('/cities/' + cityCreated)
        .set({ Authorization: 'Bearer ' + tokenAuth })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('name')
    })

    it('Edit city', async () => {
        const res = await request(server)
        .put('/cities/' + cityCreated)
        .set({ Authorization: 'Bearer ' + tokenAuth })
        .send({
            name: 'name edited'
        })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toBe('City was updated successfully.')
    })

    it('Remove city', async () => {
        const res = await request(server)
        .delete('/cities/'+ cityCreated)
        .set({ Authorization: 'Bearer ' + tokenAuth })
        expect(res.statusCode).toEqual(200)
    })

    it('Get all cities', async () => {
        const res = await request(server)
        .get('/cities')
        .set({ Authorization: 'Bearer ' + tokenAuth })
        expect(res.statusCode).toEqual(200)
    })
})