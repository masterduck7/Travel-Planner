const request = require('supertest')
const app = require('../../appTest')
const http = require('http');

describe('Hotels tests', () => {
    let server;
    let tokenAuth = null;
    let hotelCreated = null;

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

    it('Create a new hotel', async () => {
        const res = await request(server)
        .post('/hotels')
        .set({ Authorization: 'Bearer ' + tokenAuth })
        .send({
            name: 'Test hotel',
            number_beds: 10,
            breakfast: true,
            start_date: '2020-02-01',
            end_date: '2020-03-01',
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
        hotelCreated = res.body.id
    })

    it('Get one hotel', async () => {
        const res = await request(server)
        .get('/hotels/' + hotelCreated)
        .set({ Authorization: 'Bearer ' + tokenAuth })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('name')
    })

    it('Edit hotel', async () => {
        const res = await request(server)
        .put('/hotels/' + hotelCreated)
        .set({ Authorization: 'Bearer ' + tokenAuth })
        .send({
            name: 'name edited'
        })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toBe('Hotel was updated successfully.')
    })

    it('Remove hotel', async () => {
        const res = await request(server)
        .delete('/hotels/'+ hotelCreated)
        .set({ Authorization: 'Bearer ' + tokenAuth })
        expect(res.statusCode).toEqual(200)
    })

    it('Get all hotels', async () => {
        const res = await request(server)
        .get('/hotels')
        .set({ Authorization: 'Bearer ' + tokenAuth })
        expect(res.statusCode).toEqual(200)
    })
})