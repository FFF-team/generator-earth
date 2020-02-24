import { withRouter } from 'react-router-dom'
import React from 'react';

//需要保留滚动位置的页面
const LISTS = ['/site'];

class ScrollToTop extends React.PureComponent {
    componentDidUpdate(prevProps) {

        //当前路由path
        let newPathName = this.props.location.pathname;

        //长列表页面 保留滚动位置
        if (LISTS.indexOf(newPathName) > -1) {
            return ;
        }

        //不是同一个路由时候 默认滚动到顶部
        if (this.props.location !== prevProps.location) {
            window.scrollTo(0, 0);
        }

    }

    render() {

        return this.props.children || null;
    }
}

export default withRouter(ScrollToTop)
