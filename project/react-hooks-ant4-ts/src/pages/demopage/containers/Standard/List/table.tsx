import React from 'react'
import { Link } from 'react-router-dom'
import { Modal } from 'antd'
import { ColumnProps } from 'antd/lib/table'

import BaseTableContainer from 'ROOT_SOURCE/base/BaseTableContainer'


interface ITableRecord {
    id: string,
}


export default class extends BaseTableContainer<{}, ITableRecord> {

    getColumns(): ColumnProps<ITableRecord>[] {
        return [{
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
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => {
                return <a onClick={() => { this._onDelete(record.id) }} >删除</a>;
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
                await this.props.updateTable(this.props.formData)
            },
            onCancel() { },
        });
    }


}

