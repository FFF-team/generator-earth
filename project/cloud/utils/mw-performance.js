//const config = require('config');
//const LOG_DIR = config.get('LOG_DIR');
//const { info } = require('./logger')(LOG_DIR);



module.exports = function(logger) {
    
    return async function logPerfermance(ctx, next) {
        
        let reqTime = new Date();
        await next();
        let resTime = new Date();
        
        let redirectLocation = ctx.response.headers.location;
        
        logger.info(
            '[' + (resTime-reqTime) + ']',
            ctx.method, ctx.status,
            ctx.path + ctx.search + ( redirectLocation ? ` -> ${redirectLocation}` : '' ),
            ctx.ip, ctx.protocol, 
        );
    }
    
}
