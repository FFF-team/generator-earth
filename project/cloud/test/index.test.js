const request = require('supertest');
const app = require('../index');

beforeAll(async () => {
    await app.close();
    await app && app.listen(8080)
});

afterAll(async () => {
    await app && app.close();
});

