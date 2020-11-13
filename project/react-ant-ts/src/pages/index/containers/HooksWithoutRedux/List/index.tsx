import React, { useState, useContext } from 'react'
import { Button } from 'antd'
import { Link, RouteComponentProps } from 'react-router-dom'

import F from './form'
import T from './table'

import request from 'ROOT_SOURCE/utils/request'
import {RESPONSE_DESTRUST_KEY, RESPONSE_LIST_DESTRUST_KEY } from 'ROOT_SOURCE/base/BaseConfig'
import { BaseContext } from 'ROOT_SOURCE/utils/context'



/**
 * Warning
 * 由于未使用redux，List页跳转到Item页后，
 * 再跳转回来时是空白List页：未能获取之前的formData和tableTable
 */
export default function (props: RouteComponentProps) {

    let [tableData, setTableData] = useState({dataSource: []});


    let { CONTAINER_ROUTE_PREFIX } = useContext(BaseContext);


    let updateTable = async (params={}) => {
        let result = await request.post('/asset/getAsset', params)
        
        if (!result) { return; }
        
        // 解构server结果
        let resultBody = result[RESPONSE_DESTRUST_KEY]
        
        if (!resultBody) { return; }
        
        // 更新table
        setTableData({
            dataSource: resultBody[RESPONSE_LIST_DESTRUST_KEY],
        })
    };


    return (
        <section>
            <Link to={`${CONTAINER_ROUTE_PREFIX}/add`}>
                <Button type="primary" style={{marginTop: '12px'}}>新增</Button>
            </Link>
            <F updateTable={updateTable} />
            <T updateTable={updateTable} tableData={tableData} />
        </section>
    );

}

