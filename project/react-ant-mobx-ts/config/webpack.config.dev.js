const alias = require('./alias');
const filenames = require('./filenames');
const externals = require('./externals');

module.exports = {
    // todo: 只支持entry.vendor, plugins，其他的字段都会被忽略用默认的
    resolve: {
        alias: alias
    },
    output: {
        // publicPath: '/payment-web-api/', // 确保 publicPath 总是以斜杠(/)开头和结尾
        filenames: filenames.dev
    },
    externals: externals
    // cssModule: {
    //     exclude: ['src/static', 'node_modules'],
    //     name: '[name]__[local]-[hash:base64:5]'
    // }
};
