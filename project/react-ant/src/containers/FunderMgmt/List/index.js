import React, { Component } from 'react'
import { Form, Button } from 'antd'
import { Link } from 'react-router-dom'

import { funcContainerHOC } from 'ROOT_SOURCE/base/BaseContainer'
import combineContainer from  'ROOT_SOURCE/base/CompConjunction'

import F from './form'
import T from './table'

import actions from './actions'
import reducers from './reducers'



let ListTable = combineContainer(T).withReducers(reducers).withActions(actions).val()
let ListForm = combineContainer(F).withReducers(reducers).withActions(actions).val()
ListForm = Form.create()(ListForm)


export default funcContainerHOC( function Container(props, context) {
    
    return (
        <section>
            <table>
                <tr>
                    <td style={{border: '1px solid blue'}}>ActionFactory</td>
                    <td style={{border: '1px solid blue'}}>&#x2713;</td>
                </tr>
                <tr>
                    <td style={{border: '1px solid blue'}}>ReducerFactory</td>
                    <td style={{border: '1px solid blue'}}>&#x2717;</td>
                </tr>
                <tr>
                    <td style={{border: '1px solid blue'}}>BaseTableContainer</td>
                    <td style={{border: '1px solid blue'}}>&#x2713;</td>
                </tr>
            </table>
            
            <Link to={`${context.CONTAINER_ROUTE_PREFIX}/add`}>
                <Button type="primary" style={{marginTop: '12px'}}>新增</Button>
            </Link>
            <ListForm {...props} />
            <ListTable />
        </section>
    )
} )