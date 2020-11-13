import React from 'react'
import { Link } from 'react-router-dom'
import { Table, Modal } from 'antd'
import { TableProps, ColumnProps } from 'antd/lib/table'

import BaseContainer from 'ROOT_SOURCE/base/BaseContainer'



interface ITableRecord {
    id: string,
}


interface ITableProps4List extends TableProps<ITableRecord> {
    updateTable : (params?: any) => any,
    tableData: {dataSource?: Array<any>, [propName: string]: any},
}



export default class extends BaseContainer<ITableProps4List> {
    
    getColumns(): ColumnProps<ITableRecord>[] {
        return [{
                title: '编号',
                dataIndex: 'assetCode',
                key: 'assetCode'
            }, {
                title: '名称',
                dataIndex: 'assetName',
                key: 'assetName'
            }, {
                title: '主体',
                dataIndex: 'contract',
                key: 'contract'
            }, {
                title: '时间',
                dataIndex: 'contractDate',
                key: 'contractDate'
            }, {
                title: '创建时间',
                dataIndex: 'createDate',
                key: 'createDate'
            }, {
                title: '操作',
                key: 'action',
                render: (text, record) => (
                    <Link to={`${this.context.CONTAINER_ROUTE_PREFIX}/item/${record.id}`}>查看/修改</Link>
                )
            }, {
                title: '操作',
                key: 'action',
                render: (text, record) => {
                    return <a onClick={()=>{this._onDelete(record.id)}} >删除</a> ;
                }
            }]
    }
    
    
    
    _onDelete = (id) => {
        Modal.confirm({
            title: '确定要删除吗？',
            onOk: async () => {
                // 换成真实删除请求
                // await this.props.deleteRecord(id)
                await this.sleep(1000)
                // 重新刷新table
                await this.props.updateTable()
            },
            onCancel() {},
        });
    }
    
    
    
    render () {
        return (
            <div className="ui-background clearfix">
                <Table
                    title={()=>''}
                    rowKey={(record)=>record.id}
                    dataSource={this.props.tableData.dataSource}
                    columns={this.getColumns()}
                    pagination={false}
                />
            </div>
        )
    }

}

