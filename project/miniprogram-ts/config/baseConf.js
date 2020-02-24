const path = require('path');

function _join(dirname) {
    return path.join(__dirname, '../src/', dirname);
}

module.exports = {
    output: path.resolve(__dirname, '../miniprogram/'),
    input: path.resolve(__dirname, '../src'),
    taskFnLists: ['css', 'js', 'wxml', 'mv'],
    aliasConfig: {
        SRC: _join(''),
        PAGES: _join('pages'),
        COMPONENTS: _join('components'),
        IMGS: _join('imgs'),
        UTILS: _join('utils'),
        LIBS: _join('libs'),
        CONFIGS: _join('configs'),
        ROOT_SOURCE: _join('../'),
    },
};
