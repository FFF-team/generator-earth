import React, { Component, FC, ComponentClass, ComponentType, ReactElement } from 'react'
import { RouteComponentProps } from 'react-router-dom'

import { BaseContext } from 'ROOT_SOURCE/utils/context'


/**
 * 普通container的基类
 * 已包装所在路由的前缀
 */
export default class BaseContainer<P={}, S={}> extends Component<P & RouteComponentProps, S> {
    
    static contextType = BaseContext
    
    /**
     * 可以使用  this.context.CONTAINER_ROUTE_PREFIX 获取 routeContainerHOC提供的路径前缀
     * 如
    instanceMethod() {
        console.log(this.context.CONTAINER_ROUTE_PREFIX)
    }
     */
    
    sleep(n=0) {
        return new Promise(resolve=>{
            setTimeout( ()=>resolve(), n )
        })
    }
}


/**
 * @deprecated
 * 对函数组件和类组件，改为使用contextHoc4FC和contextHoc4CC
 * 
 * @param Comp 
 */
export const contextHoc: (Comp: ComponentType) => ComponentType = function contextHoc(Comp) {
    // class组件
    if ( Comp.prototype.render ) {
        let C = Comp as ComponentClass;
        C.contextType = BaseContext;
        return C;
    // function组件
    } else {
        let fc = Comp as FC
        return function(props) {
            return (
                <BaseContext.Consumer>
                { (context) => fc(props, context) }
                </BaseContext.Consumer>
            )
        }
    }
}


/**
 * 为FC提供context
 * @param fc 
 */
export const contextHoc4FC: 
    ( fc: (props: RouteComponentProps, context: {CONTAINER_ROUTE_PREFIX: string}) => ReactElement )
    => (props: RouteComponentProps) => ReactElement
= function contextHoc(fc) {
    return function(props) {
        return (
            <BaseContext.Consumer>
            { (context) => fc(props, context) }
            </BaseContext.Consumer>
        )
    }
}


/**
 * 为ComponentClass提供context
 * @param CompClass
 */
export const contextHoc4CC: <T>(CompClass: T) => T = function<ComponentClass>(CompClass: ComponentClass) {
    // @ts-ignore
    CompClass.contextType = BaseContext;
    return CompClass;
}

// let A =contextHoc4CC (class extends React.Component {
//     render() {
//         this.props
//         return <div>a</div>
//     }
// })

