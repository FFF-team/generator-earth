import React from 'react'
import { Switch, Route, Redirect, RouteComponentProps } from 'react-router-dom'

import { BaseContext } from 'ROOT_SOURCE/utils/context'

import List from './List/'
import Item from './Item/'
import Add from './Add/'


/**
 * 子路由的top container，负责给其下所有孩子提供BaseContext以及route
 * @param props
 */
export default function Container(props: RouteComponentProps) {

    const CONTAINER_ROUTE_PREFIX = props.match.path

    const ROUTE_LIST = `${CONTAINER_ROUTE_PREFIX}/list`,
        ROUTE_ADD = `${CONTAINER_ROUTE_PREFIX}/add`,
        ROUTE_ITEM = `${CONTAINER_ROUTE_PREFIX}/item/:type(view|edit)/:id(\\d+)`

    return (
        <BaseContext.Provider value={{ CONTAINER_ROUTE_PREFIX }}>
            <Switch>
                <Route path={ROUTE_LIST} component={List} />
                <Route path={ROUTE_ITEM} component={Item} />
                <Route path={ROUTE_ADD} component={Add} />
                <Redirect to={{ pathname: ROUTE_LIST }} />
            </Switch>
        </BaseContext.Provider>
    )
}

