const JWTModel = require('../../src/app/models/JWT');
const UserModel = require('../../src/app/models/User');

const factory = require('../../src/database/factory')
const request = require('supertest')
const app = require('../../src/server/app')

const { openConnection } = require('../../src/database/connection');
const connection = openConnection();

describe('User', () => {
    const constUserData = { 
        email: 'teste123@gmail.com',
        password: '123'
    }

    let user = null;
    let jwt = null;

    beforeAll(async (done) => {
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
        const userRandom = factory.user();
        
        const response = await request(app)
            .post('/user')
            .send(userRandom)
            .expect(201)

            console.log(response.status);
        // expect(response.status).toBe(201);
        done();
    });

    it('Should update a user', async (done) => {
        const newRandomUser = factory.user(constUserData);
        user = await UserModel.create(newRandomUser);
        jwt = await JWTModel.create(constUserData.email, constUserData.password);
        
        const response = await request(app)
            .put('/user')
            .send(newRandomUser)
            .set('Authorization', jwt.token)
            .expect(201)

            console.log(response.status);
        // expect(response.status).toBe(200);
        done();
    });

    it('Should show a user', async (done) => {
        console.log(jwt);
        console.log(user);
        const response = await request(app)
            .get('/user')
            .set('Authorization', jwt.token)
            .expect(201)

        console.log(response.status);
        // expect(response.status).toBe(200);
        done();
    });

})
