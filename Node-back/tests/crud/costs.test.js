const request = require('supertest')
const app = require('../../appTest')
const http = require('http');

describe('Costs tests', () => {
    let server;
    let tokenAuth = null;
    let costCreated = null;

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

    it('Create a new cost', async () => {
        const res = await request(server)
        .post('/costs')
        .set({ Authorization: 'Bearer ' + tokenAuth })
        .send({
            name: 'Test cost',
            total_price: 1000,
            badge_total_price: 'USD',
            cityID: 1
        })
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty('name')
        costCreated = res.body.id
    })

    it('Get one cost', async () => {
        const res = await request(server)
        .get('/costs/' + costCreated)
        .set({ Authorization: 'Bearer ' + tokenAuth })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('name')
    })

    it('Edit cost', async () => {
        const res = await request(server)
        .put('/costs/' + costCreated)
        .set({ Authorization: 'Bearer ' + tokenAuth })
        .send({
            name: 'name edited'
        })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toBe('Cost was updated successfully.')
    })

    it('Remove cost', async () => {
        const res = await request(server)
        .delete('/costs/'+ costCreated)
        .set({ Authorization: 'Bearer ' + tokenAuth })
        expect(res.statusCode).toEqual(200)
    })

    it('Get all costs', async () => {
        const res = await request(server)
        .get('/costs')
        .set({ Authorization: 'Bearer ' + tokenAuth })
        expect(res.statusCode).toEqual(200)
    })
})