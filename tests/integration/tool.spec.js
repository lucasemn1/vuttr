const JWTModel = require('../../src/app/models/JWT');
const UserModel = require('../../src/app/models/User');

const factory = require('../../src/database/factory');
const request = require('supertest');
const app = require('../../src/server/app');

const { openConnection } = require('../../src/database/connection');
const connection = openConnection();

describe('User', () => {
    let jwt = null;
    let toolRandom = null;

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

    it('Should create a user and get JWT', async () => {
        const constUserData = {  
            email: 'teste@gmail.com',
            password: '123'
        };
        const userRandom = factory.user(constUserData);
        const userId = await UserModel.create(userRandom);

        const user = await UserModel.find(userId);
        
        jwt = await JWTModel.create(constUserData.email, constUserData.password);

        expect(user.email).toBe(constUserData.email);
    });

    it('Should create a tool', async () => {
        toolRandom = factory.tool();
        toolRandom.tags = [
            factory.tag(), 
            factory.tag(), 
            factory.tag()
        ]

        const response = await request(app)
            .post('/tool')
            .send(toolRandom)
            .set('Authorization', jwt.token)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/);

        expect(response.body.title).toBe(toolRandom.title);
        for(let i = 0; i<response.body.tags; i++) {
            expect(response.body.tags[i]).toBe(toolRandom.tags[i]);
        }
    });

    it('Should list all tools of this user', async () => {
        const response = await request(app)
            .get('/tools')
            .set('Authorization', jwt.token)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/);

        expect(response.body.length).toBe(1);
    });

    it('Not should list tools of this user with informed tag', async () => {
        const response = await request(app)
            .get(`/tools?tag=testing`)
            .set('Authorization', jwt.token)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/);

        expect(response.body.length).toBe(0);
    });
})
