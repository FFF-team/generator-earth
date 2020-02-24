import React from 'react'

export default (props) => {
    const CONTAINER_ROUTE_PREFIX = props.match.path

    return (
        <div>{`Welcome ${CONTAINER_ROUTE_PREFIX}`} </div>
    )
};

