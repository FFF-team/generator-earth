const Koa = require('koa');
const path = require('path');
const koaStatic = require('koa-static');
const config = require('config');

const LOG_DIR = config.get('LOG_DIR');
const GATEWAY_SERVER = config.get('GATEWAY_SERVER');

const { RTN_CODE } = require('./utils/constants');
const logger = require('./utils/logger')(LOG_DIR);
const proxyToJava = require('./utils/proxy');

const performance = require('./utils/mw-performance');
const filterFavicon = require('./utils/mw-favicon');
const heartbeat = require('./utils/mw-heartbeat');



const app = new Koa();

//设置后ctx.ip是原始ip，否则取到的是nginx服务器的IP
app.proxy = true;

// 设置签名的Cookie密钥
// app.keys = ['nodejs_cas_cookie_secret_key'];


// 打印代理信息
// console.log('PROXY_SERVER==>', PROXY_SERVER);


// 抓取全局异常
process.on('uncaughtException', function(err) {
    logger.error('caught_by_uncaughtException', err);
    throw err;
});

// 抓取异步异常
process.on('unhandledRejection', function(err, p) {
    logger.error('caught_by_unhandledRejection', err);
});


// 捕获中间件异常
app.use(async function errHandleFacade(ctx, next) {
    try {
        await next();
    } catch(err) {
        logger.errorWithCtx(ctx, 'caught_by_err_handler_middleware', err);
        
        ctx.body = {
            code: RTN_CODE.ERR_NODEJS,
            msg: err.message,
            data: null,
        };
    }
});


// filter out favicon
app.use(filterFavicon);


// heartbeat
app.use(heartbeat);


// 性能数据
app.use(performance(logger));


// html目录
app.use(koaStatic(`${__dirname}/static`));


// 无效html页面拦截
app.use(async (ctx, next) => {
    const isPage = ctx.path.match(/\.html$/) !== null;
    if(isPage) {
        return ctx.redirect(`/index.html${ctx.search}`);
    }

    await next();
});


// 业务里需要跳转到其他页面
app.use(async (ctx, next) => {
    // 和后端约定，处理来源302之类的逻辑
    // 例
    // 已投放的链接为  
    // https://abc.com/index.html?page=page1
    // https://abc.com/index
    // 现在要改为
    // https://abc.com/page.html
    // 就可以在这里redirect
    await next();
});


// 代理相关异步请求
app.use(async (ctx, next) => {
	
	try {
        var _startProxyTime = new Date();
    
        logger.infoWithCtx(ctx, 'start proxying');
        
        await proxyToJava(ctx, GATEWAY_SERVER);
        
        let _timeSpent = '[' + ((new Date) - _startProxyTime) + 'ms]';
        
        logger.infoWithCtx(ctx, 'finished proxying', ctx.status, _timeSpent);
        
    } catch(err) {
        
        let _timeSpent = '[' + ((new Date) - _startProxyTime) + 'ms]';
        
        logger.errorWithCtx(ctx, 'failed proxying', ctx.status, _timeSpent, err);
        
        ctx.body = {
            code: RTN_CODE.ERR_PROXY,
            msg: 'proxyed server response err: ' + err.message,
            data: null
        };
        
    }
	
})




app.listen(8001).on('clientError', (err, socket) => {
    logger.error('caught_by_koa_on_client_error', err);
    socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});