import React from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'

import { contextHoc4FC } from 'ROOT_SOURCE/base/BaseContainer'
import combineContainer from  'ROOT_SOURCE/base/CompConjunction'

import F from './form'
import T from './table'

import actions from './actions'
import reducers from './reducers'

let ListTable = combineContainer(T).withReducers(reducers).withActions(actions).val()
let ListForm = combineContainer(F).withReducers(reducers).withActions(actions).val()


export default contextHoc4FC((props, context) => (
    <section>
        <Link to={`${context.CONTAINER_ROUTE_PREFIX}/add`}>
            <Button type="primary" style={{marginTop: '12px'}}>新增</Button>
        </Link>
        <ListForm />
        <ListTable />
    </section>
))

