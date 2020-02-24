import { MOD_PREFIX } from '../constants'
import {
    LIST__UPDATE_FORM_DATA,
    LIST__UPDATE_TABLE_DATA
} from './actions'

import ReducerFactory from 'ROOT_SOURCE/base/ReducerFactory'


const List = ReducerFactory.createListPageReducer(
    LIST__UPDATE_FORM_DATA,
    LIST__UPDATE_TABLE_DATA,
)


export default {
    [`${MOD_PREFIX}__LIST`]: List,
}