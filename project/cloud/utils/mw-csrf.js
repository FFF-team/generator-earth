/**
 * 是否post，否的话无需防御
 * 是否当前url属于白名单：是则无需防御
 * 获取cookie ppu：如果未获取，则认为无需防御
 * ppu存在：获取 http header x-csrf-token,判断x-csrf-token与ppu是否相同：是则认为通过校验
 * 否则拒绝服务
 */
module.exports = function (csrfWhiteList) {
    return async function csrf(ctx, next) {
        let method = ctx.request.method;

        if (method !== 'POST') {
            await next();
        } else if (csrfWhiteList.includes(ctx.request.path)) {
            await next();
        } else if (ctx.cookies.get('PPU') === undefined) {
            await next();
        } else if (ctx.request.get('x-csrf-token') === ctx.cookies.get('PPU')) {
            await next();
        } else {
            //   return ctx.throw(401, 'access_denied');
            ctx.body = {
                code: '401',
                msg: 'csrf_access_denied'
            }
        }
    }
};
