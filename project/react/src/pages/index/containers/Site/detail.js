import React from 'react'
import { getRequestParams } from 'tools/utils'

const Detail = ({match, location}) => {


    const query = getRequestParams(location.search);

    return (

        <div style={{height: '2000px'}}>{`hi my id is ${match.params.id}, ts is ${query.ts}`}</div>

    )

}

export default Detail
