const del = require('del');
const devConf = require('../../config/dev');
const prodConf = require('../../config/prod');

const conf = process.env.NODE_ENV === 'prod' ? prodConf : devConf;
const dist = conf.output;


function clean(cb) {
    del.sync([dist], { force: true });
    cb();
}

module.exports = clean;
