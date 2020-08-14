const request = require('supertest')
const app = require('../appTest')
const http = require('http');

describe('Costs tests', () => {
    let server;
    let tokenAuth = null;

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

    it('Create a new user without username', async () => {
        const res = await request(server)
        .post('/users')
        .set({ Authorization: 'Bearer ' + tokenAuth })
        .send({
            password: 'Testing',
            email: 'test@lpsoftware.space',
            country: 'CL',
            visitedCountries: 'CL',
            permissionLevel: 1,
            userLogged: process.env.SEED_SUPERUSER_USERNAME
        })
        expect(res.statusCode).toEqual(400)
        expect(res.body.name).toBe('SequelizeValidationError')
    })

    it('Create a new trip without destination', async () => {
        const res = await request(server)
        .post('/trips')
        .set({ Authorization: 'Bearer ' + tokenAuth })
        .send({
            start_date: '2020-02-01T06:46:28.304Z',
            end_date: '2020-03-01T06:46:28.304Z',
            planning_file: 'test_file.xlsx',
            status: 'ACTIVE',
            userID: 1
        })
        expect(res.statusCode).toEqual(400)
        expect(res.body.name).toBe('SequelizeValidationError')
    })

    it('Create a new flight without origin', async () => {
        const res = await request(server)
        .post('/flights')
        .set({ Authorization: 'Bearer ' + tokenAuth })
        .send({
            destination: 'Test destination',
            start_date: '2020-02-01T06:46:28.304Z',
            end_date: '2020-03-01T06:46:28.304Z',
            airline_name: 'Airline Tests',
            flight_number: '111',
            price: '1000',
            badge_price: 'USD',
            tripID: 1
        })
        expect(res.statusCode).toEqual(400)
        expect(res.body.name).toBe('SequelizeValidationError')
    })

    it('Create a new city with name null', async () => {
        const res = await request(server)
        .post('/cities')
        .set({ Authorization: 'Bearer ' + tokenAuth })
        .send({
            name: null,
            country: 'CL',
            map_link: 'map.xlsx',
            tripID: 1
        })
        expect(res.statusCode).toEqual(400)
        expect(res.body.name).toBe('SequelizeValidationError')
    })

    it('Create a new activity with name null', async () => {
        const res = await request(server)
        .post('/activities')
        .set({ Authorization: 'Bearer ' + tokenAuth })
        .send({
            name: null,
            activity_date: '2020-02-01T06:46:28.304Z',
            total_price: 1000,
            amount_paid: 1000,
            amount_not_paid: 0,
            badge_total_price: 'USD',
            badge_amount_paid: 'USD',
            badge_amount_not_paid: 'USD',
            cityID: 1
        })
        expect(res.statusCode).toEqual(400)
        expect(res.body.name).toBe('SequelizeValidationError')
    })

    it('Create a new hotel with name null', async () => {
        const res = await request(server)
        .post('/hotels')
        .set({ Authorization: 'Bearer ' + tokenAuth })
        .send({
            name: null,
            number_beds: 10,
            breakfast: true,
            start_date: '2020-02-01T06:46:28.304Z',
            end_date: '2020-03-01T06:46:28.304Z',
            total_price: 1000,
            amount_paid: 1000,
            amount_not_paid: 0,
            badge_total_price: 'USD',
            badge_amount_paid: 'USD',
            badge_amount_not_paid: 'USD',
            cityID: 1
        })
        expect(res.statusCode).toEqual(400)
        expect(res.body.name).toBe('SequelizeValidationError')
    })

    it('Create a new cost with name null', async () => {
        const res = await request(server)
        .post('/costs')
        .set({ Authorization: 'Bearer ' + tokenAuth })
        .send({
            name: null,
            total_price: 1000,
            badge_total_price: 'USD',
            cityID: 1
        })
        expect(res.statusCode).toEqual(400)
        expect(res.body.name).toBe('SequelizeValidationError')
    })
})