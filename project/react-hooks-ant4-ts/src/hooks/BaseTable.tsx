import React, { FC } from 'react'
import {
    Table,
} from 'antd'
import { useBaseTable } from 'ROOT_SOURCE/hooks/useBaseTable'
import { ITableProps4List } from 'ROOT_SOURCE/base/BaseTableContainer'


// UI 复用组件
const BaseTable: FC<ITableProps4List<any, any>> = ({
    tableData,
    formData,
    resetTable,
    updateTable,
    onChange,
    ...tableProps
}) => {
    const [pagination, onTableChange] = useBaseTable({
        formData,
        resetTable,
        updateTable: onChange || updateTable,
    });

    return <Table
        bordered
        rowKey="index"
        dataSource={(tableData && tableData.dataSource) || []}
        onChange={onTableChange}
        pagination={pagination}
        scroll={{
            x: true
        }}
        {...tableProps}
    />
}


export default BaseTable
