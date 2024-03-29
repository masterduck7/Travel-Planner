const request = require('supertest')
const app = require('../../appTest')
const http = require('http');
const varProd = require('../../varProd.js');

describe('Flights tests', () => {
    let server;
    let tokenAuth = null;
    let flightCreated = null;

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
            username: varProd.SEED_SUPERUSER_USERNAME,
            password: varProd.SEED_SUPERUSER_PASSWORD
        })
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty('accessToken')
        tokenAuth = res.body.accessToken
    })

    it('Create a new flight', async () => {
        const res = await request(server)
        .post('/flights')
        .set({ Authorization: 'Bearer ' + tokenAuth })
        .send({
            origin: 'Test origin',
            destination: 'Test destination',
            start_date: '2020-02-01T06:46:28.304Z',
            end_date: '2020-03-01T06:46:28.304Z',
            airline_name: 'Airline Tests',
            flight_number: '111',
            price: '1000',
            badge_price: 'USD',
            tripID: 1
        })
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty('destination')
        flightCreated = res.body.id
    })

    it('Get one flight', async () => {
        const res = await request(server)
        .get('/flights/' + flightCreated)
        .set({ Authorization: 'Bearer ' + tokenAuth })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('destination')
    })

    it('Edit flight', async () => {
        const res = await request(server)
        .put('/flights/' + flightCreated)
        .set({ Authorization: 'Bearer ' + tokenAuth })
        .send({
            destination: 'Destination edited'
        })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('message')
        expect(res.body.message).toBe('Flight was updated successfully.')
    })

    it('Remove flight', async () => {
        const res = await request(server)
        .delete('/flights/'+ flightCreated)
        .set({ Authorization: 'Bearer ' + tokenAuth })
        expect(res.statusCode).toEqual(200)
    })

    it('Get all flights', async () => {
        const res = await request(server)
        .get('/flights')
        .set({ Authorization: 'Bearer ' + tokenAuth })
        expect(res.statusCode).toEqual(200)
    })
})