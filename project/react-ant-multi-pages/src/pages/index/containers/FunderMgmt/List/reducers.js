import { MOD_PREFIX } from '../constants'
import {
    LIST__UPDATE_FORM_DATA,
    LIST__UPDATE_TABLE_DATA
} from './actions'


const List = function (previousState = {
    formData: {},
    tableData: {},
}, action) {
    
    switch (action.type) {
        case LIST__UPDATE_FORM_DATA:
            return Object.assign( {}, previousState, {formData: action.payload} )
        
        case LIST__UPDATE_TABLE_DATA:
            return Object.assign( {}, previousState, {tableData: action.payload} )
        
        default:
            return previousState
    }

}


export default {
    [`${MOD_PREFIX}__LIST`]: List,
}