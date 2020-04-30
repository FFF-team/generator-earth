import * as React from 'react'
import * as moment from 'moment';

// import ReactDOM from 'react-dom'

import { HashRouter, Route } from 'react-router-dom'

import App from './App'
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { Provider } from 'mobx-react';
import Store from './store';

moment.locale('zh-cn');

// @ts-ignore 注释
ReactDOM.render(
    <Provider {...Store}>
        <LocaleProvider locale={zhCN}>
            <HashRouter>
                <Route component={App}/>
            </HashRouter>
        </LocaleProvider>
    </Provider>
    ,
    document.getElementById('root')
)

