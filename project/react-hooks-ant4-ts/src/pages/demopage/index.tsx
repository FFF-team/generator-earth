import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Route } from 'react-router-dom'

import {Provider} from 'react-redux'
import store from 'ROOT_SOURCE/utils/store'

import App from './App'

// v4.x 国际化方案变动
/**
 * 1. LocaleProvider => ConfigProvider
 * 2. zh_CN 模块引入地址变动 antd/lib/locale-provider/zh_CN => antd/es/locale/zh_CN
 *
*/
import { ConfigProvider  } from 'antd';
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

