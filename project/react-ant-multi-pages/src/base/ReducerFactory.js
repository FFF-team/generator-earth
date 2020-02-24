/**
 * author: jiajianrong
 * reducerFactory：创建普通reducers以及列表页和详情页reducers
 */




/** 
 * 
 * 
 * 创建一个或多个reducer
 * 
 * 首先需要把redux理解成： 
 *     业务container或component通过action 生成新store
 *     redux内部会使用该action做参数，将所有的reducer方法都执行一遍
 *     所有的reducer方法执行后返回的新对象，进而组成新store
 * 
 * 对于大型的后台系统，我认为按照redux的设计初衷，
 * 按业务对象创建store的key值是不明智的，比如：
 *     store {
 *         users: [],
 *         products: []
 *         ...
 *     }
 * 
 * 大型后台系统的菜单栏 一般会以功能类别划分，如资产方管理，交易查询，对账管理等
 * 一般这些功能之间没什么耦合关系
 * 因此最合适的方式是将每一个菜单所对应的container都独立按需加载，
 * 同时其依赖的action及reducer也随之按需加载
 *     store {
 *         资产方管理: {},
 *         交易查询: {}
 *         ...
 *     }
 * 
 * redux的store的设计初衷是 按业务对象创建store的key值，如：
 *     store {
 *         assets: [],
 *         transactions: [],
 *         ...
 *     }
 * 我认为上面设计是不适合用在这种后台系统的
 * 因为交易查询里的数据，一般不会被其他container使用
 * 像上面一样，store里的key值数量很快就会膨胀起来，而且更糟糕的是，
 * key值太多会使后面的同学 命名为难甚至命名重复
 * 
 * 所以，结合container按需加载，我认为store里的key值应该为菜单item
 * 我们需要把一个菜单业务里的所有数据，想象成一个独立的store(尽管实际上不是这样)
 * 不和外界(其他菜单业务)有联系
 * 
 * 如果你确实有需要在当前container去connect其他container的actions或者reducers
 * 完全没问题
 * aContainer.js
 * 
 * import {bReducers, bActions} from '../b/dir'
 * 
 * combineContainer(aContainer)
 *     .withReducers(aReducers)
 *     .withReducers(bReducers)
 *     .withActions(aActions)
 *     .withActions(bActions)
 * 这样aContainer里就可以使用bContainer的action及reducer了
 * 
 * 
 * 但是需要注意的是，container是按需加载的，
 * 一个container去connect不同container的action是没有问题的，
 * 因为action仅仅是函数，
 * 按需加载之后，不同container持有同一action的不同拷贝，
 * 这些container执行其对应的action拷贝时 不会有任何副作用
 * 同样
 * 一个container去connect不同container的reducer也没有潜在问题，
 * 因为reducer也仅仅是函数，
 * 按需加载之后，整个reducer大函数都会被替换，
 * 旧reducer方法会被替换成同方法的不同拷贝 因此也不会有问题
 * 
 * 
 * 
 * @param {arguments} items
 */
function createReducers(...items) {
    
    function _initState() {
        let o = {}
        items.forEach( item => {
            o[item.key] = item.defVal
        } )
        return o
    }
    
    function _k2action(k) {
        for (let i=0;i<items.length;i++) {
            if (k===items[i].key)
                return items[i].reducedBy
        }
        throw new Error('No action name matched. Check the reducer.')
    }
    
    return function (previousState = _initState(), action) {
        for (let k in previousState) {
            if (_k2action(k)===action.type) {
                return Object.assign( {}, previousState, {[k]: action.payload} )
            }
        }
        return previousState
    }
}




/**
 * ListContainer的reducer.js里可以调用本方法生成reducers，包括formData及tableData
 * 然后这些reducers都以唯一key的形式export
 * 最后被如下方式combine到container
 * combineContainer(ListContainer).withReducers(reducers)
 * 
 * @param {Object} formActionStr
 * @param {Object} tableActionStr
 */
function createListPageReducer(formActionStr, tableActionStr) {
    return function (previousState = {
        formData: {},
        tableData: {},
    }, action) {
        
        switch (action.type) {
            case formActionStr:
                return Object.assign( {}, previousState, {formData: action.payload} )
            
            case tableActionStr:
                return Object.assign( {}, previousState, {tableData: action.payload} )
            
            default:
                return previousState
        }
    
    }
}


/**
 * ItemContainer的reducer.js里可以调用本方法生成reducers，包括formData
 * 然后这些reducers都以唯一key的形式export
 * 最后被如下方式combine到ItemContainer
 * combineContainer(container).withReducers(reducers)
 * 
 * @param {Object} pupolateActionStr
 * @param {Object} resetActionStr
 */
function createItemPageReducer(pupolateActionStr, resetActionStr) {
    return function (previousState = {
        formData: {},
    }, action) {
        
        switch (action.type) {
            case pupolateActionStr:
                return {formData: action.payload}
            
            case resetActionStr:
                return {formData: {}}
            
            default:
                return previousState
        }
    
    }
}





export default {
    /* 创建普通reducers */
    createReducers,
    /* 创建列表页reducer */
    createListPageReducer,
    /* 创建详情页reducer */
    createItemPageReducer,
}