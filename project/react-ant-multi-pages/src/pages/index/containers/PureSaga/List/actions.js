import request from 'ROOT_SOURCE/utils/request'
import { CURRENT_PAGE, PAGE_SIZE, TOTAL, RESPONSE_DESTRUST_KEY, RESPONSE_LIST_DESTRUST_KEY } from 'ROOT_SOURCE/base/BaseConfig'
import { MOD_PREFIX } from '../constants'


export const LIST__UPDATE_FORM_DATA
          = `${MOD_PREFIX}__LIST__UPDATE_FORM_DATA`

export const LIST__UPDATE_TABLE_DATA
          = `${MOD_PREFIX}__LIST__UPDATE_TABLE_DATA`

export const LIST__SUBMIT_FORM_ASYNC
          = `${MOD_PREFIX}__LIST__SUBMIT_FORM_ASYNC`


const submitFormAsync = function(/*formData|pagination*/formData={}) {
    return async (dispatch, getState) => {
        dispatch({
            type: LIST__SUBMIT_FORM_ASYNC,
            payload: formData
        })
    }
}


export default {
    submitFormAsync,
}