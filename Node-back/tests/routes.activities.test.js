const request = require('supertest')
const app = require('../appTest')
const http = require('http');

describe('Activities tests', () => {
    let server;
    let tokenAuth = null;
    let activityCreated = null;

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

    it('Create a new activity', async () => {
        const res = await request(server)
        .post('/activities')
        .set({ Authorization: 'Bearer ' + tokenAuth })
        .send({
            name: 'Test activity',
            activity_date: '2020-02-01',
            total_price: 1000,
            amount_paid: 1000,
            amount_not_paid: 0,
            badge_total_price: 'USD',
            badge_amount_paid: 'USD',
            badge_amount_not_paid: 'USD',
            cityID: 1
        })
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty('name')
        activityCreated = res.body.id
    })

    it('Get one activity', async () => {
        const res = await request(server)
        .get('/activities/' + activityCreated)
        .set({ Authorization: 'Bearer ' + tokenAuth })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('name')
    })

    it('Edit activity', async () => {
        const res = await request(server)
        .put('/activities/' + activityCreated)
        .set({ Authorization: 'Bearer ' + tokenAuth })
        .send({
            name: 'name edited'
        })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toBe('Activity was updated successfully.')
    })

    it('Remove activity', async () => {
        const res = await request(server)
        .delete('/activities/'+ activityCreated)
        .set({ Authorization: 'Bearer ' + tokenAuth })
        expect(res.statusCode).toEqual(200)
    })

    it('Get all activities', async () => {
        const res = await request(server)
        .get('/activities')
        .set({ Authorization: 'Bearer ' + tokenAuth })
        expect(res.statusCode).toEqual(200)
    })
})