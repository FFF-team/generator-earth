import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Table, Modal } from 'antd'
import { TableProps, ColumnProps } from 'antd/lib/table'

import { BaseContext } from 'ROOT_SOURCE/utils/context'
import useTablePagination from 'ROOT_SOURCE/base/useTablePagination'



interface ITableRecord {
    id: string,
}


interface ITableProps4List extends TableProps<ITableRecord> {
    updateTable : (params?: any) => any,
    resetTable?: Function,
    tableData: {dataSource?: Array<any>, [propName: string]: any},
    formData: any,
}



export default function (props: ITableProps4List) {

    const { CONTAINER_ROUTE_PREFIX } = useContext(BaseContext);

    const pagination = useTablePagination(props);


    const columns: ColumnProps<ITableRecord>[] = [
        {
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
                <Link to={`${CONTAINER_ROUTE_PREFIX}/item/${record.id}`}>查看/修改</Link>
            )
        }, {
            title: '操作',
            key: 'action',
            render: (text, record) => {
                return <a onClick={()=>{onDelete(record.id)}} >删除</a> ;
            }
        },
    ];


    const onDelete = (id) => {
        Modal.confirm({
            title: '确定要删除吗？',
            onOk: async () => {
                // 换成真实删除请求
                // await this.props.deleteRecord(id)
                console.log('deleting...', id);
                // 重新刷新table
                await props.updateTable();
            },
            onCancel() {},
        });
    };


    return (
        <Table className="ui-background clearfix"
            title={()=>''}
            rowKey={record=>record.id}
            dataSource={props.tableData.dataSource}
            columns={columns}
            {...pagination}
        />
    );

}
