const factory = require('../../src/database/factory')
const request = require('supertest')
const app = require('../../src/server/app')
const connection = require('../../src/database/connection');

describe('User', () => {

    beforeEach(async (done) => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
        done();
    });

    afterAll(async (done) => {
        await connection.destroy();
        await app.close;
        done();
    });

    it('Should create a user', async (done) => {
        const user = factory.user();

        const response = await request(app)
            .post('/user')
            .send(user)
            .expect(201)

        expect(response.status).toBe(201);
        done();
    });

})
