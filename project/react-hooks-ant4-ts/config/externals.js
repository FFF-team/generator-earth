let files = ['demopage.html', /*有其他页面的话配置在这里*/ ];

// workaround security check
let cdnPrefix = '//j1.5' + '8cdn.com.cn/jinrong/finsys-js/';

module.exports = {
    'babel-polyfill': {
        entry: {
            path: cdnPrefix + 'babel-polyfill/6.23.0/polyfill.min.js',
            type: 'js'
        },
        files: files
    },
    // 'prop-types': {
    //     root: 'PropTypes',
    //     entry: {
    //         path: cdnPrefix + 'prop-types.min.js',
    //         type: 'js'
    //     },
    //     files: files
    // },
    'react': {
        root: 'React',
        entry: {
            path: cdnPrefix + 'react/v16.13.0/react.production.min.js',
            type: 'js'
        },
        files: files
    },
    'react-dom': {
        root: 'ReactDOM',
        entry: {
            path: cdnPrefix + 'react-dom/v16.13.0/react-dom.production.min.js',
            type: 'js'
        },
        files: files
    },
    'redux': {
        root: 'Redux',
        entry: {
            path: cdnPrefix + 'redux.min.js',
            type: 'js'
        },
        files: files
    },
    'react-redux': {
        root: 'ReactRedux',
        entry: {
            path: cdnPrefix + 'react-redux.min.js',
            type: 'js'
        },
        files: files
    },
    'redux-thunk': {
        root: 'ReduxThunk',
        entry: {
            path: cdnPrefix + 'redux-thunk.min.js',
            type: 'js'
        },
        files: files
    },
    'react-router-dom': {
        root: 'ReactRouterDOM',
        entry: {
            path: cdnPrefix + 'react-router-dom/v5.1.2/react-router-dom.min.js',
            type: 'js'
        },
        files: files
    },
    'lodash': {
        root: '_',
        entry: {
            path: cdnPrefix + 'lodash.min.js',
            type: 'js'
        },
        files: files
    },
    'moment': {
        root: 'moment',
        entry: {
            path: cdnPrefix + 'moment-with-zh-cn.js',
            type: 'js'
        },
        files: files
    },
    'antd': {
        root: 'antd',
        entry: [{
                path: cdnPrefix + 'antd/v4.0.2/antd.min.js',
                type: 'js'
            },
            {
                path: cdnPrefix + 'antd/v4.0.2/antd.min.css',
                type: 'css'
            }
        ],
        files: files
    }
}
