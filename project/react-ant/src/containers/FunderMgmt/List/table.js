import React from 'react'
import { Link } from 'react-router-dom'

import BaseTableContainer from 'ROOT_SOURCE/base/BaseTableContainer'


export default class extends BaseTableContainer {
    
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
    

}

