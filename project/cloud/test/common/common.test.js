const { isArray } = require('lodash');
const request = require('supertest');
const app = require('../../index');
const { CSRF_WHITE_LIST } = require('../../utils/constants');

describe("test commonLogic", ()=>{
    test("/favicon.ico", async ()=>{
        await request(app)
        .get("/favicon.ico")
        .expect(200)
    });

    test("/heartbeat", async ()=>{
        await request(app)
        .get("/heartbeat")
        .expect("Content-Length", "33")
        .expect("Content-Type", "application/json; charset=utf-8")
        .expect(200, {"code":0,"msg":null,"data":null})
    });

})

describe("test csrf", ()=>{
    test("get request", async ()=>{
        await request(app)
        .get("/heartbeat")
        .expect(200)
    });

    test("whitelist", ()=>{
        if(isArray(CSRF_WHITE_LIST) && CSRF_WHITE_LIST.length > 0) {
            CSRF_WHITE_LIST.map(async (item) => {
                await request(app)
                .post(item)
                .expect(200)
            })
        }
    });

    test("request with no ppu", async ()=>{
        await request(app)
        .post("/sqborder/order/calculate")
        .expect(200)
    });

    test("x-csrf-token equal ppu", async ()=>{
        await request(app)
        .post("/sqborder/order/calculate")
        .set('Cookie',['PPU=TEST'])
        .set('x-csrf-token','TEST')
        .expect(200)
    });

    test("elseLogic: x-csrf-token not equal ppu", async ()=>{
        await request(app)
        .post("/test/csrf")
        .set('Cookie',['PPU=TEST'])
        .set('x-csrf-token','TEST2')
        .expect(200,{code: '401', msg: 'csrf_access_denied'})
    });
})

afterAll(async () => {
    await app && app.close();
});

beforeAll(async () => {
    await app.close();
    await app && app.listen(8080)
})
