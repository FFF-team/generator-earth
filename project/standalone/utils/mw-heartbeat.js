async function heartbeat(ctx, next) {
    if ( ctx.path.startsWith('/heartbeat') ) {
        ctx.body = {
            code: 0,
            msg: null,
            data: null
        }
        return;
    }

    await next();
}


module.exports = heartbeat;