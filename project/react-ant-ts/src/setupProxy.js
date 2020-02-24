const proxy = require("http-proxy-middleware");


module.exports = function (app) {
    // 这里配置需要代理的api
    const proxy_local = "http://localhost:8004";
    //const proxy_to_rd_srv = "http://10.240.41.234:8080";

    app.use(proxy('/nodeapi', { target: proxy_local }));
    app.use(proxy('/asset', { target: proxy_local }));
};
