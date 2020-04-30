/**
 * Created by Chuans on 2019/4/4
 * Author: Chuans
 * Github: https://github.com/chuans
 * Time: 10:15 AM
 */
import * as React from 'react';
import CommonTableList from 'COMP/common-table-list';
import CommonTableStore from 'COMP/common-table-list/store';
import FT from './form-table';
import { Button } from 'antd';
import { observer, inject } from 'mobx-react';
import DetailsStore, { SOURCE_ID } from './store';
import './style.scss';

const URL = '/test/getList';

interface IProps {
    detailsStore: DetailsStore;
    commonTableStore:CommonTableStore;
}

@inject('detailsStore','commonTableStore')
@observer
class Home extends React.Component<IProps> {
    render() {
        const { setParamsStr, paramsStr, setRequestStr, requestStr, setLoading, getPage2Data } = this.props.detailsStore;
        return (
            <div>
                <CommonTableList
                    FT={FT}
                    type="get"
                    url={URL}
                    isShowLoading={true}
                    sourceId={SOURCE_ID}
                    pagination={{
                        pageNo: 1,
                        pageSize: 3
                    }}
                    commonTableStore={this.props.commonTableStore}
                />
                <h1>下面按钮展示了，进行对表格的其他自定义操作</h1>
                <ul>
                    <li>
                        <Button onClick={setParamsStr}>获取当前所有的参数列表</Button>
                        <p>{paramsStr}</p>
                    </li>
                    <li>
                        <Button onClick={setRequestStr}>获取当前请求的url和type</Button>
                        <p>{requestStr}</p>
                    </li>
                    <li>
                        <Button onClick={setLoading}>手动展示加载loading</Button>
                    </li>
                    <li>
                        <Button style={{ marginTop: 20 }} onClick={getPage2Data}>根据当前已有的参数请求第二页的数据</Button>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Home;
