import React, { useContext } from 'react'
import { Button } from 'antd'
import { Link, RouteComponentProps } from 'react-router-dom'

import { BaseContext } from 'ROOT_SOURCE/utils/context'
import combineContainer from  'ROOT_SOURCE/base/CompConjunction'

import F from './form'
import T from './table'

import actions from './actions'
import reducers from './reducers'



let ListTable = combineContainer(T).withReducers(reducers).withActions(actions).val()
let ListForm = combineContainer(F).withReducers(reducers).withActions(actions).val()



export default function (props: RouteComponentProps) {

    let { CONTAINER_ROUTE_PREFIX } = useContext(BaseContext);

    return (
        <section>
            <Link to={`${CONTAINER_ROUTE_PREFIX}/add`}>
                <Button type="primary" style={{marginTop: '12px'}}>新增</Button>
            </Link>
            <ListForm />
            <ListTable />
        </section>
    );

}

