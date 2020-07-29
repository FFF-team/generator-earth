import * as React from 'react'
import * as Loadable from 'react-loadable';
import { Switch, Route, Link } from 'react-router-dom';
import { Layout, Menu, Icon, Spin } from 'antd';
import './App.scss'

import Home from './containers/Home/'

//1
const Details = Loadable({
    loader: () => import('./containers/Details/' /* webpackChunkName:"AssetMgmt" */),
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

interface Props {
    location: {
        [key: string]: string
    }
}

class App extends React.Component<Props> {

    render() {
        let totalPath: string = this.props.location.pathname;
        let prefixArr: RegExpMatchArray = totalPath.match(/^\/[^/]*/) || [];

        return (
            <Spin spinning={false} style={{ maxHeight: window.innerHeight }}>
                <Layout style={{ minHeight: '100vh' }}>

                    <Sider collapsible>
                        <div className="logo">金融</div>
                        <Menu theme="dark"
                              defaultSelectedKeys={[ '/' ]}
                              defaultOpenKeys={[ '/Asset', '/Funder' ]}
                              mode="inline"
                              selectedKeys={[ prefixArr[0] ]}
                        >
                            <Menu.Item key={'/'}>
                                <Icon type="book"/>
                                <span>首页</span>
                                <Link to="/"></Link>
                            </Menu.Item>

                            <SubMenu key="/page" title={<span><Icon type="book"/>测试</span>}>
                                <Item key="/Details">
                                    <span>详情信息</span>
                                    <Link to="/Details"></Link>
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

                                {/* 对账管理 */}
                                <Route path="/Details" component={Details}/>

                            </Switch>
                        </Content>
                    </Layout>

                </Layout>
            </Spin>
        )
    }

}

export default App;
