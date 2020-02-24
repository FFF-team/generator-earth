import React, { Component, createContext } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

import { routeContainerHOC, funcContainerHOC } from 'ROOT_SOURCE/base/BaseContainer'

import List from './List/'
import Item from './Item/'
import Add  from './Add/'



export default  routeContainerHOC( funcContainerHOC(function Container(props, {CONTAINER_ROUTE_PREFIX}) {
    
    const ROUTE_LIST = `${CONTAINER_ROUTE_PREFIX}/list`,
          ROUTE_ADD  = `${CONTAINER_ROUTE_PREFIX}/add`,
          ROUTE_ITEM = `${CONTAINER_ROUTE_PREFIX}/item/:id`;
    
    return (
        <Switch>
            <Route path={ROUTE_LIST} render={(props)=><List {...props} />} />
            <Route path={ROUTE_ITEM} render={(props)=><Item {...props} />} />
            <Route path={ROUTE_ADD}  render={(props)=><Add  {...props} />} />
            <Redirect to={{pathname: ROUTE_LIST}} />
        </Switch>
    )
}) )
