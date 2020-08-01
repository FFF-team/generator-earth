const path = require('path');


let webpackConf = {
    resolve: {
        alias: {
            ROOT_SOURCE: path.resolve('src'),
        },
    },
    output: {
        // publicPath必须以/结尾，否则jsThunk路径缺少/
        //publicPath: '//j1.5-8-cdn.com.cn/jinrong/unique-project-name-on-cdn/',
        publicPath: '',
    }
};



let devSrvConf = {
    proxy: {
        '/api': 'http://localhost:8004',
        '/asset': 'http://localhost:8004',
    },
};

let devSrvPort = 8014;





module.exports = {
    webpackConf,
    devSrvConf,
    devSrvPort,
};
