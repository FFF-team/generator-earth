import React from 'react'
import { Button } from 'antd'
import { Link, RouteComponentProps } from 'react-router-dom'

import F from './form'
import T from './table'

import BaseContainer from 'ROOT_SOURCE/base/BaseContainer'
import request from 'ROOT_SOURCE/utils/request'
import { RESPONSE_DESTRUST_KEY, RESPONSE_LIST_DESTRUST_KEY } from 'ROOT_SOURCE/base/BaseConfig'


/**
 * Warning
 * 由于未使用redux，List页跳转到Item页后，
 * 再跳转回来时是空白List页：未能获取之前的formData和tableTable
 */
export default class extends BaseContainer<RouteComponentProps, { formData: any, tableData: any }> {

    constructor(props: RouteComponentProps) {
        super(props)

        this.state = {
            formData: {},
            tableData: {
                dataSource: [],
            },
        }
    }


    /**
     * 更新table，会被form container和table container都调用
     */
    updateTable = async (params?: any) => {

        // 更新state
        if (params) {
            this.setState({ formData: params })
        }

        // 提交表单最好新一个事务，不受其他事务影响
        await this.sleep()

        let result = await request.post('/asset/getAsset', this.state.formData)

        if (!result) { return; }

        // 解构server结果
        let resultBody = result[RESPONSE_DESTRUST_KEY]

        if (!resultBody) { return; }

        // 更新table
        this.setState({
            tableData: {
                dataSource: resultBody[RESPONSE_LIST_DESTRUST_KEY],
            },
        })
    }



    render() {
        return (
            <section>
                <Link to={`${this.context.CONTAINER_ROUTE_PREFIX}/add`}>
                    <Button type="primary" style={{ marginTop: '12px' }}>新增</Button>
                </Link>
                <F updateTable={this.updateTable} {...this.props} />
                <T updateTable={this.updateTable} tableData={this.state.tableData} {...this.props} />
            </section>
        )
    }
}
