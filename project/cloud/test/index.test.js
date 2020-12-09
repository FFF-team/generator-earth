const request = require('supertest');
const app = require('../index');

beforeAll(async () => {
    await app.close();
    await app && app.listen(8080)
});

afterAll(async () => {
    await app && app.close();
});

describe('test uncaughtException', () => {
    const error = jest.fn(() => {
        throw 'the error don`t catch';
    });

    test('don`t catch error', () => {
        expect(() => error()).toThrow();
        expect(error.mock.calls.length).toBe(1);
    });

    test('catch error', () => {
        let catchError = () => {
            try {
                error();
            } catch(e) {
                console.log('catch error msg: ', e);
            }
        };

        expect(() => catchError()).not.toThrow();
    });
});
