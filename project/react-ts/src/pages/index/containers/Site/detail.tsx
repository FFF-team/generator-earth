import React from 'react'
import { getRequestParams } from 'tools/utils'
import { RouteComponentProps } from 'react-router'


interface Iprops extends RouteComponentProps<{id: string}> {}

const Detail = ({match, location}: Iprops) => {


    const query = getRequestParams(location.search);

    return (

        <div style={{height: '2000px'}}>{`hi my id is ${match.params.id}, ts is ${query.ts}`}</div>

    )

}

export default Detail
