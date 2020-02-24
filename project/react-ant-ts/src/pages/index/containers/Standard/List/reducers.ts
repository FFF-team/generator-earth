import { Reducer4List } from 'ROOT_SOURCE/utils/types'
import { MOD_PREFIX } from '../constants'
import {
    LIST__UPDATE_FORM_DATA,
    LIST__UPDATE_TABLE_DATA
} from './actions'


const defaultState = {
    formData: {},
    tableData: {},
}


const List: Reducer4List = function (previousState = defaultState, action) {
    
    switch (action.type) {
        case LIST__UPDATE_FORM_DATA:
            return Object.assign( {}, previousState, {formData: action.payload} )
        
        case LIST__UPDATE_TABLE_DATA:
            return Object.assign( {}, previousState, {tableData: action.payload} )
        
        default:
            return previousState
    }

}


export type IReducerProps = typeof defaultState
export default { [`${MOD_PREFIX}__LIST`]: List }