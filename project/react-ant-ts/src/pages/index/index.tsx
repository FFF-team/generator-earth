import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route } from 'react-router-dom'

import {Provider} from 'react-redux'
import store from 'ROOT_SOURCE/utils/store'

import App from './App'

import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

ReactDOM.render(
    <ConfigProvider locale={zhCN}>
        <Provider store={store}>
            <HashRouter>
                <Route component={App} />
            </HashRouter>
        </Provider>
    </ConfigProvider>
    ,
    document.getElementById('root')
)

