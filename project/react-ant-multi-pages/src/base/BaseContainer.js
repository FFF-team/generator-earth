import React, { Component } from 'react'
import PropTypes from 'prop-types'


/**
 * 普通container的基类
 * 已包装所在路由的前缀
 */
export default class extends Component {
    
    static contextTypes = {
        CONTAINER_ROUTE_PREFIX: PropTypes.string,
    }
    
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
 * 如果不继承自 BaseContainer，而选择使用函数的话，需此HOC包装
 */
export const funcContainerHOC = function(FuncContainer) {
    
    FuncContainer.contextTypes = {
        CONTAINER_ROUTE_PREFIX: PropTypes.string
    }
    
    return FuncContainer;
}



/**
 * 所有继承自上述BaseContainer的Container以及Component 都应该在某个含有Route的Container之下，
 * 即
 * <RouteContainer>
 *     <BaseContainer/>
 *     <BaseContainer/>
 *     <BaseContainer/>
 *     ...
 * </RouteContainer>
 * 
 * routeContainerHOC 为 RouteContainer 赋值 childContextTypes
 */
export const routeContainerHOC = function(BaseContainer) {
    return class extends Component {
    
        static childContextTypes = {
            CONTAINER_ROUTE_PREFIX: PropTypes.string,
        }
        
        getChildContext () {
            const { match } = this.props;
            
            return {
                CONTAINER_ROUTE_PREFIX: match.path,
            }
        }
        
        
        render() {
            return <BaseContainer {...this.props} />
        }
    }
}


