import React from 'react'
import { routeContainerHOC, funcContainerHOC } from 'ROOT_SOURCE/base/BaseContainer'


const Home = (props, {CONTAINER_ROUTE_PREFIX}) => {
    return (
        <div>{`welcome home-2019 ${CONTAINER_ROUTE_PREFIX}`}</div>
    )
};

export default routeContainerHOC(funcContainerHOC(Home));
