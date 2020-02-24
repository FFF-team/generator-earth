import React, { Component } from 'react'
import { connect } from 'react-redux'
import Loadable from 'react-loadable';
import { Switch, Route, Link } from 'react-router-dom'
import { Layout, Menu, Icon, Spin } from 'antd'

import './App.scss'


import Home from 'ROOT_SOURCE/containers/Home/'
import TransactionQuery from 'ROOT_SOURCE/containers/TransactionQuery/'


//1
const AssetMgmt = Loadable({
    loader: () => import('ROOT_SOURCE/containers/AssetMgmt/' /* webpackChunkName:"AssetMgmt" */),
    loading() {
        return null;
    }
});


//2
const AssetProdMgmt = Loadable({
    loader: () => import('ROOT_SOURCE/containers/AssetProdMgmt/' /* webpackChunkName:"AssetProdMgmt" */),
    loading() {
        return null;
    }
});


//3
const FundChannelCfg = Loadable({
    loader: () => import('ROOT_SOURCE/containers/FundChannelCfg/' /* webpackChunkName:"FundChannelCfg" */),
    loading() {
        return null;
    }
});


//4
const FunderMgmt = Loadable({
    loader: () => import('ROOT_SOURCE/containers/FunderMgmt/' /* webpackChunkName:"FunderMgmt" */),
    loading() {
        return null;
    }
});


//5
const FunderProdMgmt = Loadable({
    loader: () => import('ROOT_SOURCE/containers/FunderProdMgmt/' /* webpackChunkName:"FunderProdMgmt" */),
    loading() {
        return null;
    }
});


//6
const PureSaga = Loadable({
    loader: () => import('ROOT_SOURCE/containers/PureSaga/' /* webpackChunkName:"PureSaga" */),
    loading() {
        return null;
    }
});



const { Header, Content, Sider } = Layout;
const { SubMenu, Item } = Menu;



/**
 * 路由细节
 * https://github.com/jiajianrong/documents/blob/master/react/react-router%E9%9B%86%E6%88%90antd%20-%20%E8%B7%AF%E7%94%B1%E6%96%B9%E6%A1%88.md
 **/

class App extends Component {
    

    render () {
        
        let totalPath = this.props.location.pathname
        let prefixPath = totalPath.match(/^\/[^/]*/)[0]
        
        let globalLoading = this.props.globalLoading
        
        return (
            <Spin spinning={globalLoading} style={{ maxHeight: window.innerHeight }}>
            <Layout style={{ minHeight: '100vh' }}>
            
                <Sider collapsible>
                    <div className="logo">金融</div>
                    <Menu theme="dark"
                        defaultSelectedKeys={['/']}
                        defaultOpenKeys={['/menu1','/menu2','/menu3']}                     
                        mode="inline"
                        selectedKeys={[prefixPath]}
                        >
                        
                        <Item key="/">
                            <Icon type="book" />
                            <span>首页</span>
                            <Link to="/"></Link>
                        </Item>
                        
                        <Item key="/TransactionQuery">
                            <Icon type="book"/>
                            <span>空页面</span>
                            <Link to="/TransactionQuery"></Link>
                        </Item>
                        
                        <SubMenu key="/menu1" title={<span><Icon type="book"/>使用框架</span>}>
                            <Item key="/AssetMgmt">
                                <span>完全使用框架(推荐)</span>
                                <Link to="/AssetMgmt"></Link>
                            </Item>
                            <Item key="/AssetProdMgmt">
                                <span>部分使用框架1(推荐)</span>
                                <Link to="/AssetProdMgmt"></Link>
                            </Item>
                            <Item key="/FundChannelCfg">
                                <span>部分使用框架2</span>
                                <Link to="/FundChannelCfg"></Link>
                            </Item>
                            <Item key="/FunderMgmt">
                                <span>部分使用框架3</span>
                                <Link to="/FunderMgmt"></Link>
                            </Item>
                        </SubMenu>
                        
                        <SubMenu key="/menu2" title={<span><Icon type="book"/>完全不使用框架</span>}>
                            <Item key="/FunderProdMgmt">
                                <span>不使用redux</span>
                                <Link to="/FunderProdMgmt"></Link>
                            </Item>
                        </SubMenu>
                        
                        <SubMenu key="/menu3" title={<span><Icon type="book"/>完全使用Saga</span>}>
                            <Item key="/PureSaga">
                                <span>完全使用Saga</span>
                                <Link to="/PureSaga"></Link>
                            </Item>
                        </SubMenu>
                        
                    </Menu>
                </Sider>
                
                
                <Layout>
                    <Header style={{ background: '#fff', textAlign: 'center' }}>
                        <h1>金融</h1>
                    </Header>
                    <Content style={{ margin: '0 16px' }}>
                        <Switch>
                            {/* 首页 */}
                            <Route exact path="/" component={Home}/>
                            
                            {/* 资产方管理 */}
                            <Route path="/AssetMgmt" component={AssetMgmt}/>
                            {/* 产品管理 */}
                            <Route path="/AssetProdMgmt" component={AssetProdMgmt}/>
                            {/* 资金通道配置 */}
                            <Route path="/FundChannelCfg" component={FundChannelCfg}/>
                            
                            {/* 资金方管理 */}
                            <Route path="/FunderMgmt" component={FunderMgmt}/>
                            {/* 产品管理 */}
                            <Route path="/FunderProdMgmt" component={FunderProdMgmt}/>
                            
                            {/* PureSaga */}
                            <Route path="/PureSaga" component={PureSaga}/>
                            
                            {/* 交易查询 */}
                            <Route path="/TransactionQuery" component={TransactionQuery}/>
                            
                        </Switch>
                    </Content>
                </Layout>
            
            </Layout>
            </Spin>
        )
    }

}

export default connect( state => ({globalLoading: state.globalLoading}) )(App);
