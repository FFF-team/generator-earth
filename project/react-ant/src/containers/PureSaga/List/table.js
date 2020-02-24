import React from 'react'
import { Link } from 'react-router-dom'

import { Table } from 'antd'

import { CURRENT_PAGE, PAGE_SIZE, TOTAL } from 'ROOT_SOURCE/base/BaseConfig'
import BaseContainer from 'ROOT_SOURCE/base/BaseContainer'


export default class extends BaseContainer {
    
    getColumns() {

        return this._columns = this._columns || [{
                title: '资产方编号',
                dataIndex: 'assetCode',
                key: 'assetCode'
            }, {
                title: '资产方名称',
                dataIndex: 'assetName',
                key: 'assetName'
            }, {
                title: '签约主体',
                dataIndex: 'contract',
                key: 'contract'
            }, {
                title: '签约时间',
                dataIndex: 'contractDate',
                key: 'contractDate'
            }, {
                title: '联系人',
                dataIndex: 'contacts',
                key: 'contacts'
            }, {
                title: '联系电话',
                dataIndex: 'contactsPhone',
                key: 'contactsPhone'
            }, {
                title: '创建时间',
                dataIndex: 'createDate',
                key: 'createDate'
            }, {
                title: '操作人',
                dataIndex: 'operator',
                key: 'operator'
            }, {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <Link to={`${this.context.CONTAINER_ROUTE_PREFIX}/item/${record.id}`}>查看/修改</Link>
                )
            }]
    }
    
    
    
    
    /**
     * table分页信息
     * @override
     * component.pagination {pageSize/rows, pageNo/page, total}
     * 转换为
     * antd.pagination {pageSize, current, total}
     */
    getPagination() {
        return {
            pageSize: this.props.formData[PAGE_SIZE],
            current: this.props.formData[CURRENT_PAGE],
            total: this.props.formData[TOTAL],
        }
    }
    
    
    /**
     * 分页，排序，筛选回调
     * 目前需求仅为分页
     */
    handleTableChange = async (pagination) => {
        // 重置table
        this.props.resetTable && this.props.resetTable()
        
        // 提交表单最好新一个事务，不受其他事务影响
        await this.sleep()
        
        this.props.submitFormAsync({
            ...this.props.formData,
            [CURRENT_PAGE]: pagination.current //pagination选中另一页面
        })    
    }
    
    
    
    render () {
        
        return (
            <div className="ui-background clearfix">
                <Table
                    title={()=>''}
                    rowKey={(record, index)=>index}
                    dataSource={this.props.tableData.dataSource}
                    columns={this.getColumns()}
                    onChange={this.handleTableChange}
                    pagination={this.getPagination()}
                />
            </div>
        )
    }


}

