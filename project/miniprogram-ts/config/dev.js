const path = require('path');
const baseConf = require('./baseConf');

let devConf = {
    // domain: "",
    watchMap: [{
        path: path.resolve(__dirname, '../src/**/*.scss').replace(/\\/g, '/'),
        taskName: 'css',
        option: {
            ignoreInitial: false,
        },
    }, {
        path: path.resolve(__dirname, '../src/**/*.ts').replace(/\\/g, '/'),
        taskName: 'js',
        option: {
            ignoreInitial: false,
        },
    }, {
        path: path.resolve(__dirname, '../src/**/!(*.ts|*.scss)').replace(/\\/g, '/'),
        taskName: 'mv',
        options: {
            ignoreInitial: false,
        },
    }],
    mockPort: 9001,
};

devConf = Object.assign(baseConf, devConf);

module.exports = devConf;
