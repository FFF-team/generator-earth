import * as React from 'react'
import { Form, Table } from 'antd'
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import { CURRENT_PAGE, PAGE_SIZE, TOTAL } from '../../base/BaseConfig'
import { AllDataSourceParams, Pagination } from 'ROOT_SOURCE/interface/common';
import { INIT_PAGINATION } from 'ROOT_SOURCE/components/common-table-list/index';
import * as moment from 'moment';
import { IFormTable } from './interface'

interface IProps extends IFormTable {

}


@observer
class TableContainer extends React.Component<IProps> {
    /**
     * 获取数据 外部可调用
     * @param params 查询参数
     */
    getData = async (params = {}) => {
        const { getFieldsValue } = this.props.form;

        let values = getFieldsValue();


        values = {
            ...values,
            ...params
        }

        values = this.transformRequest(values);

        await this.props.getData(values);
    }

    /**
     * 用于处理请求前的参数转换，可自定义实现
     * 请求前的参数处理
     * 比如说为空 或者 时间转换成字符串
     * @param params
     */
    transformRequest(values) {
        // TODO 临时处理
        for (const key in values) {
            if (!values[key]) {
                values[key] = '';
            }
            if (moment.isMoment(values[key])) {
                values[key] = moment(values[key]).format('YYYY-MM-DD');
            }

        }

        return values;
    }

    /**
     * 获取当前本项目的相关数据
     * @desc 具体哪些字段 请查看AllDataSourceParams
     */
    getLocalData = (): AllDataSourceParams => {
        return toJS(this.props.store.allDataSource[this.props.sourceId])
    }


    /**
     * 额外的展开行
     */
    getExpandedRowRender = () => {
        return false;
    }

    /**
     * table的标题
     * @override
     */
    getTitle = (): React.ReactNode | null | any => null


    /**
     * table的列对象
     * 必须在派生类中实现
     * @override
     */
    getColumns(): any {
        throw new Error('getColumns must be overriden to return an array');
    }


    /**
     * table row唯一标识字段
     * @override
     */
    getRowKey(record, index) {
        return index
    }


    /**
     * table数据源
     * @override
     * 默认使用reducer数据
     */
    getDataSource(): Array<any> {
        const state = this.props.store.allDataSource[this.props.sourceId];

        if (state) {
            return state.list;
        }

        return []
    }


    /**
     * table分页信息
     * @override
     * component.pagination {pageSize/rows, pageNo/page, total}
     * 转换为
     * antd.pagination {pageSize, current, total}
     */
    getPagination(): Pagination {
        const dataBase: any = toJS(this.props.store.allDataSource[this.props.sourceId]);

        return {
            pageSize: dataBase[PAGE_SIZE],
            current: dataBase[CURRENT_PAGE],
            total: dataBase[TOTAL],
            showTotal: total => `共 ${total} 条数据`
        }
    }


    /**
     * 分页，排序，筛选回调
     * 目前需求仅为分页
     */
    handleTableChange = async ({ current, pageSize }) => {
        await this.getData({
            pageSize,
            pageNo: current
        });
    }


    /**
     * 表格的子组件，通常用于表格相关的弹窗
     * @override
     */
    getTableExtraContent() {
        return null
    }


    /**
     * 是否有滚动条
     * @override
     */
    getScroll() {
        return {
            x: true
        }
    }


    /**
     * 选择框，用于批量操作
     * @override
     */
    rowSelection() {
        return {}
    }


    /**
     * 提交表单
     * @override
     */
    submitForm = async (e) => {
        e && e.preventDefault()

        // 查询的时候page信息初始化为1
        await this.getData(INIT_PAGINATION);
    }

    formProps() {
        return {};
    }

    /**
     * 子搜索Item列表
     * 必须实现
     */
    getSearchItems(): any {
        throw new Error('getSearchItems must be overriden to return an array');
    }

    render() {
        // expandedRowRender={this.getExpandedRowRender}

        const Items: React.ReactNode | null = this.getSearchItems();

        return (
            <React.Fragment>

                {Items && (
                    <div className="ui-background">
                        <Form {...this.formProps()} onSubmit={this.submitForm}>
                            {Items}
                        </Form>
                    </div>
                )}

                <div className="ui-background clearfix">
                    {this.getTableExtraContent()}
                    <Table
                        bordered
                        title={this.getTitle()}
                        rowKey={this.getRowKey}
                        dataSource={this.getDataSource()}
                        columns={this.getColumns()}
                        onChange={this.handleTableChange}
                        pagination={this.getPagination()}
                        scroll={this.getScroll()}
                        rowSelection={this.rowSelection()}
                    />
                </div>
            </React.Fragment>

        )
    }
}

export default TableContainer
