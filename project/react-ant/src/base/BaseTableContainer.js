import React from 'react'
import { Table } from 'antd'

import { CURRENT_PAGE, PAGE_SIZE, TOTAL } from './BaseConfig'
import BaseContainer from './BaseContainer'


export default class extends BaseContainer {
    
    /**
     * table的标题
     * @override
     */
    getTitle = () => (
        ''
        //throw 'getTitle must be overriden to return a string'
    )
    
    
    /**
     * table的列对象
     * @override
     */
    getColumns() {
        throw new Error('getColumns must be overriden to return an array')
    }
    
    
    /**
     * table row唯一标识字段
     * @override
     */
    getRowKey(record, index) {
        return index
        //throw new Error('getRowKey must be overriden to return a string')
    }
    
    
    /**
     * table数据源
     * @override
     * 默认使用reducer数据
     */
    getDataSource() {
        return this.props.tableData.dataSource
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
        
        this.props.updateTable({
            ...this.props.formData,
            [CURRENT_PAGE]: pagination.current //pagination选中另一页面
        })
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
    getScroll() {}
    
    
    /**
     * 选择框，用于批量操作
     * @override
     */
    rowSelection(){
        return null
    }
    
    
    
    render () {
        
        return (
            <div className="ui-background clearfix">
                {this.getTableExtraContent()}
                <Table
                    title={this.getTitle}
                    rowKey={this.getRowKey}
                    dataSource={this.getDataSource()}
                    columns={this.getColumns()}
                    onChange={this.handleTableChange}
                    pagination={this.getPagination()}
                    expandedRowRender={this.getExpandedRowRender}
                    scroll={this.getScroll()}
                    rowSelection={this.rowSelection()}
                />
            </div>
        )
    }
}

