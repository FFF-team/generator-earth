import React, { Component, lazy, Suspense } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, Link, RouteComponentProps } from 'react-router-dom'
import { Layout, Menu, Icon, Spin } from 'antd'

import './App.scss'
import Home from './containers/Home/'


interface IAppProps extends RouteComponentProps<{}> {
    globalLoading: boolean,
}

/* 标准container，不使用工厂 */
const Standard = lazy(()=>import('./containers/Standard/'/* webpackChunkName:"Standard" */))

/* 使用工厂生成reducer和action */
const UseFactory = lazy(()=>import('./containers/UseFactory/'/* webpackChunkName:"UseFactory" */))

/* 不使用redux */
const DontUseRedux = lazy(()=>import('./containers/DontUseRedux/'/* webpackChunkName:"DontUseRedux" */))

/* 使用saga */
const UseSaga = lazy(()=>import('./containers/UseSaga/'/* webpackChunkName:"UseSaga" */))

const { Item } = Menu;



/**
 * 路由细节
 * https://github.com/jiajianrong/documents/blob/master/react/react-router%E9%9B%86%E6%88%90antd%20-%20%E8%B7%AF%E7%94%B1%E6%96%B9%E6%A1%88.md
 **/

class App extends Component<IAppProps> {
    

    render () {
        
        let totalPath = this.props.location.pathname
        let prefixPath = (totalPath.match(/^\/[^/]*/) as Array<string>)[0]
        
        let globalLoading = this.props.globalLoading
        
        return (
            <Spin spinning={globalLoading} style={{ maxHeight: window.innerHeight }}>
            <Layout style={{ minHeight: '100vh' }}>
            
                <Layout.Sider collapsible>
                    <div className="logo">金融</div>
                    <Menu theme="dark"
                        defaultSelectedKeys={['/']}
                        defaultOpenKeys={['/menu1']}                     
                        mode="inline"
                        selectedKeys={[prefixPath]}
                        >
                        
                        <Item key="/">
                            <Icon type="book" />
                            <span>首页</span>
                            <Link to="/"></Link>
                        </Item>
                        
                        <Menu.SubMenu key="/menu1" title={<span><Icon type="book"/>各container模板</span>}>
                            <Item key="/Standard">
                                <span>普通container</span>
                                <Link to="/Standard" title="(推荐) 自定义reducer和action"></Link>
                            </Item>
                            <Item key="/UseFactory">
                                <span>使用Factory</span>
                                <Link to="/UseFactory" title="(推荐) 使用框架提供的Factory生成reducer和action"></Link>
                            </Item>
                            <Item key="/UseSaga">
                                <span>使用Saga</span>
                                <Link to="/UseSaga" title="自定义reducer和action以及redux-saga"></Link>
                            </Item>
                            <Item key="/DontUseRedux">
                                <span>不使用redux</span>
                                <Link to="/DontUseRedux" title="(不推荐)"></Link>
                            </Item>
                        </Menu.SubMenu>
                        
                    </Menu>
                </Layout.Sider>
                
                
                <Layout>
                    <Layout.Header style={{ background: '#fff', textAlign: 'center' }}>
                        <h1>58金融</h1>
                    </Layout.Header>
                    <Layout.Content style={{ margin: '0 16px' }}>
                        <Suspense fallback={null}>
                        <Switch>
                            <Route exact path="/" component={Home}/>
                            <Route path="/Standard" component={Standard}/>
                            <Route path="/UseFactory" component={UseFactory}/>
                            <Route path="/DontUseRedux" component={DontUseRedux}/>
                            <Route path="/UseSaga" component={UseSaga}/>
                        </Switch>
                        </Suspense>
                    </Layout.Content>
                </Layout>
            
            </Layout>
            </Spin>
        )
    }

}

// @ts-ignore
export default connect( state => ({globalLoading: state.globalLoading}) )(App);
