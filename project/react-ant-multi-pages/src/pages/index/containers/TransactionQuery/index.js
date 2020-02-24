import React, { Component } from 'react'
import BaseContainer, { routeContainerHOC, funcContainerHOC } from 'ROOT_SOURCE/base/BaseContainer'



 class Container extends BaseContainer {
    
    render() {
        return (
            <div>empty page, route prefix is {this.context.CONTAINER_ROUTE_PREFIX}</div>
        )
    }
    
}

export default routeContainerHOC(Container)
