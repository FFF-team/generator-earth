import React, { Suspense, FC } from 'react'
import {
    Switch,
    Route,
    Redirect,
} from 'react-router-dom'
import { Spin } from 'antd'

import {
    IPorps,
} from './interface'


const BaseRoutes: FC<IPorps> = ({ routes = [], basePath = '' }) => (
    <Suspense fallback={<Spin spinning />}>
        <Switch>
            {routes.map(({ path, ...args }) => (
                <Route path={`${basePath}${path}`} {...args} />
            ))}
            <Redirect to={{ pathname: `${basePath}${routes[0].path}` }} />
        </Switch>
    </Suspense>
)


export default BaseRoutes
