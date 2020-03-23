import {
    RouteProps,
} from 'react-router-dom'


export interface IPorps {
    /**
     * 根路径
     */
    readonly basePath?: string;
    /**
     * 路由数组
     */
    readonly routes: RouteProps[];
}
