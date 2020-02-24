import { connect } from 'react-redux'

import { injectReducer, injectSaga } from './AsyncUtils'


function map2map_reducer(map) {
    return function(state) {
        let r = {}
        for ( let k in map ) {
            //r[k] = state[k]
            let o = state[k]
            for ( let kk in o ) {
                r[kk] = o[kk]
            }
        }
        return r
    }
}

function map2map_action(map) {
    return function(dispatch) {
        let r = {}
        for ( let k in map ) {
            let v = map[k]
            r[k] = val => dispatch(v(val))
        }
        return r
    }
}


/**
 * 为Component提供action及reducer
 * val()写法参照lodash: _.chain(arr)....val()
 */
export default function combineContainer(Comp) {
    
    return {
        
        _reducers: {},
        
        _actions: {},
        
        withReducers: function(reducers) {
            injectReducer(reducers)
            
            Object.assign(this._reducers, reducers)
            
            return this
        },
        
        
        withActions: function(actions) {
            let _actions = {}
            for (let k in actions) {
                let v = actions[k]
                if ( typeof v === 'function' )
                    _actions[k] = v
            }
            
            Object.assign(this._actions, actions)
            
            return this
        },
        
        
        withSagas: function(sagas) {
            injectSaga(sagas)
            return this
        },
        
        
        val: function val() {
            
            let r = map2map_reducer(this._reducers)
            let a = map2map_action(this._actions)
            
            return connect( r, a )(Comp)
        },
        
    }
    
        
}