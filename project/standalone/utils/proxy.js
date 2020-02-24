const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer({});


/**
 * 
 * @param {Object} ctx
 * @param {string} target 目标server
 */
async function proxyToJava(ctx, target) {
    return new Promise((resolve,reject) => {
        
        ctx.res.on('close', () => {
            reject(new Error('Http response closed while proxying'));
        });
        
        ctx.res.on('error', (e) => {
            reject(e/*new Error('Http response error while proxying')*/);
        });
        
        ctx.res.on('finish', () => {
            resolve();
        });
        
        proxy.web(ctx.req, ctx.res, {
            target: target,
            agent: false,
            headers: {
                ip: '',
                host: '',
                origin: '',
                'X-Origin-Ip': ctx.ip,
            }
        }, (e) => {
            reject(e);
        });
        
    })
}


module.exports = proxyToJava;