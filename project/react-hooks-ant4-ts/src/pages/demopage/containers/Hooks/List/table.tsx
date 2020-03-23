/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useState, useMemo } from 'react'
import {
    Link,
} from 'react-router-dom'
import {
    Modal,
    Popconfirm,
} from 'antd'
import { ColumnProps } from 'antd/lib/table'

import { BaseTable, useBaseContext } from 'ROOT_SOURCE/hooks'

import { IReducerProps } from './reducers'
import { IActionProps } from './actions'



interface ITableRecord {
    id: string,
}


// 在这里处理副作用
const useTableEffect = () => {
    // 控制modal显示隐藏
    const [visible, setVisible] = useState<boolean>(false)

    // get history by hooks, useHistory可以完全替代withRouter
    // const history = useHistory()

    // 路由根路径
    const CONTAINER_ROUTE_PREFIX = useBaseContext();

    // handle delete
    function onDelete() {
        console.log('onDelete', arguments)
    }

    // handle close modal
    function closeModal() {
        setVisible(false);
    }

    const columns: ColumnProps<ITableRecord>[] = useMemo(() => ([
        {
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
        }
        , {
            title: '操作',
            key: 'action',
            fixed: 'right',
            render: (text, record) => (
                <Link to={`${CONTAINER_ROUTE_PREFIX}/item/edit/${record.id}`}>查看/修改</Link>
            )
        }, {
            title: '操作',
            key: 'action',
            fixed: 'right',
            render: (text, record) => {
                return (
                    <Popconfirm
                        title="Are you sure to delete this task?"
                        onConfirm={onDelete.bind(null, record.id)}
                    >
                        <a>删除</a>
                    </Popconfirm>
                )
            }
        }, {
            title: '操作',
            key: 'action',
            fixed: 'right',
            render: (text, record) => {
                return (
                    <a onClick={() => setVisible(true)}>新增</a>
                )
            }
        }
    ]), [CONTAINER_ROUTE_PREFIX])

    return {
        columns,
        onDelete,
        visible,
        closeModal,
    }
}


const TableContainer: FC<IReducerProps & IActionProps> = (props) => {
    const { columns, visible, closeModal } = useTableEffect();

    const onOk = () => {
        console.log('onOk');
        closeModal();
    }

    return <>
        <BaseTable
            className='ui-background'
            columns={columns}
            {...props}
        />
        <Modal visible={visible} onCancel={closeModal} onOk={onOk} title="新增">
            test modal content
        </Modal>
    </>
}

export default TableContainer

