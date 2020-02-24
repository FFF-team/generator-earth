import React from 'react'
// bundleLoader
import BundleLoader from 'lm-bundle-loader'

import Home from "./Home";
import Site from './Site'

import {
    Route,
    Switch,
    Redirect,
    withRouter
} from 'react-router-dom'

// scrollToTop
import ScrollToTop from 'commons/ScrollToTop'


// 异步加载文件 参考文档 https://webpack.js.org/guides/code-splitting/#dynamic-imports
// 参数中的注释部分不建议删除，原因请看上述文档
const My = () => import( './My' /* webpackChunkName:"My" */ );


class MainRouter extends React.PureComponent {
    render() {
        return (
            <ScrollToTop>
                <Switch>
                    <Route path='/home' component={Home}/>
                    <Route path='/site' component={Site}/>
                    <Route path='/my'
                           render={
                               (props) => BundleLoader(My, props)
                           }/>

                    <Redirect to='/home'/>
                </Switch>
            </ScrollToTop>
        )
    }
}

export default withRouter(MainRouter)
