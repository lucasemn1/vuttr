const JWTModel = require('../../src/app/models/JWT');

const factory = require('../../src/database/factory');
const request = require('supertest');
const app = require('../../src/server/app');

const { openConnection } = require('../../src/database/connection');
const connection = openConnection();

describe('User', () => {
    const constUserData = { 
        email: 'teste123@gmail.com',
        password: '123'
    }
    let jwt = null;

    beforeAll(async (done) => {
        // await connection.migrate.rollback();
        // await connection.migrate.latest();
        done();
    });

    afterAll(async (done) => {
        await connection.destroy();
        await app.close;
        done();
    });

    it('Should create a user', async () => {
        const userRandom = factory.user(constUserData);

        const response = await request(app)
            .post('/user')
            .send(userRandom)
            .set('Accept', 'application/json');

        expect(response.status).toBe(201);
    });

    it('Should update a user', async () => {
        const newRandomUser = factory.user(constUserData);
        jwt = await JWTModel.create(constUserData.email, constUserData.password);
        
        const response = await request(app)
            .put('/user')
            .send(newRandomUser)
            .set('Authorization', jwt.token)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/);

        expect(response.body.name).toBe(newRandomUser.name);
        expect(response.body.email).toBe(newRandomUser.email);
        expect(response.status).toBe(200);
    });

    it('Should show a user', async () => {
        const response = await request(app)
            .get('/user')
            .set('Authorization', jwt.token)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/);

        expect(response.status).toBe(200);
    });

    it('Should delete a user', async () => {
        const response = await request(app)
            .delete('/user')
            .set('Authorization', jwt.token)
            .set('Accept', 'application/json');

        expect(response.status).toBe(204);
    });
})
