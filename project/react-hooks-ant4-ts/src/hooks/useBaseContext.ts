import { useContext } from 'react'
import { BaseContext } from 'ROOT_SOURCE/utils/context'

/**
 * @description: hooks返回当前页面路由的prefix
 */
export function useBaseContext(): string {
    const { CONTAINER_ROUTE_PREFIX } = useContext(BaseContext)

    return CONTAINER_ROUTE_PREFIX;
}
