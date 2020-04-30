/**
 * Created by Chuans on 2019/2/21
 * Author: Chuans
 * Github: https://github.com/chuans
 * Time: 3:36 PM
 */
import * as React from 'react';
import { observer } from 'mobx-react';
import { Form, Spin } from 'antd';
import { IProps, IFormTable } from './interface';
import { Pagination, RequestParams, ResultParams } from 'ROOT_SOURCE/interface/common';
import { getUUID } from 'ROOT_SOURCE/utils'


export let INIT_PAGINATION: Pagination = {
    pageSize: 10,
    pageNo: 1,
};

@observer
class CommonTableList extends React.Component<IProps> {
    FormTableList: any;

    constructor(props: IProps) {
        super(props);

        this.setFormTableList();

    }

    static defaultProps = {
        isShowLoading: true,
        sourceId: getUUID(),
        type: 'get',
        isSaveAllPage: false,
        pagination: INIT_PAGINATION
    }

    setFormTableList() {
        const { FT, sourceId, isSaveAllPage, pagination: initPagination, commonTableStore } = this.props;
        // 设置默认页码参数
        const pagination: Pagination = initPagination || INIT_PAGINATION;

        this.FormTableList = Form.create<IFormTable>()(FT);

        // 初始化相应的数据 、、页码
        commonTableStore.setDataSource(sourceId, {
            list: [],
            ...pagination
        });

        if (isSaveAllPage) {
            commonTableStore.setContainerInfo(sourceId, this.FormTableList);
        }

        return this.FormTableList;
    }

    getData = async (params = {}) => {
        const { url, sourceId, type = 'get', extraParams = {}, commonTableStore } = this.props;

        params = { ...params, ...extraParams };

        const requestParams: RequestParams = { url, sourceId, params, type }

        const result: ResultParams = await commonTableStore.getData(requestParams);

        return result;
    }

    /**
     * 当开启保存所有内容的时候使用此渲染
     */
    renderSaveAllPage(): React.ReactNode {
        const { sourceId, commonTableStore } = this.props;
        const pps = {
            sourceId,
            store: commonTableStore,
            getData: this.getData,
        }

        let Container = commonTableStore.getContainerInfo(sourceId);
        // 这个时候需要判断  当前存不存在对应的内容  不存在则需要创建
        // console.log(toJS(Store));

        if (Container) {
            return <Container {...pps}/>
        }

        Container = this.setFormTableList();


        return <Container {...pps}/>
    }

    render() {
        const { isShowLoading, isSaveAllPage, sourceId, commonTableStore } = this.props;
        const isLoading: boolean = isShowLoading ? commonTableStore.isLoading : false


        if (isSaveAllPage) {
            return (
                <Spin spinning={isLoading}>
                    {this.renderSaveAllPage()}
                </Spin>
            )
        }

        if (commonTableStore.allDataSource && !commonTableStore.allDataSource[sourceId]) {
            return null;
        }


        return (
            <Spin spinning={isLoading}>
                <this.FormTableList
                    sourceId={this.props.sourceId}
                    store={commonTableStore}
                    getData={this.getData}
                />
            </Spin>
        )
    }
}


export default CommonTableList;
