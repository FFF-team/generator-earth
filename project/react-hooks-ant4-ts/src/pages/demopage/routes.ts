import { lazy } from 'react'
import {
    RouteProps,
} from 'react-router-dom'

import Home from './containers/Home'

/* 使用hooks && 使用工厂 */
const Hooks = lazy(() => import('./containers/Hooks'/* webpackChunkName:'Hooks' */))

/* 标准container，不使用工厂 */
const Standard = lazy(()=>import('./containers/Standard'/* webpackChunkName:'Standard' */))

/* 使用工厂生成reducer和action */
const UseFactory = lazy(()=>import('./containers/UseFactory'/* webpackChunkName:'UseFactory' */))

/* 不使用redux */
const DontUseRedux = lazy(()=>import('./containers/DontUseRedux'/* webpackChunkName:'DontUseRedux' */))

/* 使用saga */
const UseSaga = lazy(()=>import('./containers/UseSaga'/* webpackChunkName:'UseSaga' */))


const routes: RouteProps[] = [
    {
        path: '/',
        component: Home,
        exact: true,
    },
    {
        path: '/Hooks',
        component: Hooks,
    },
    {
        path: '/Standard',
        component: Standard,
    },
    {
        path: '/UseFactory',
        component: UseFactory,
    },
    {
        path: '/DontUseRedux',
        component: DontUseRedux,
    },
    {
        path: '/UseSaga',
        component: UseSaga,
    },
]


export default routes
