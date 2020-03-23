import { ThunkResult } from 'ROOT_SOURCE/utils/types'
import { MOD_PREFIX } from '../constants'


export const LIST__UPDATE_FORM_DATA
          = `${MOD_PREFIX}__LIST__UPDATE_FORM_DATA`

export const LIST__UPDATE_TABLE_DATA
          = `${MOD_PREFIX}__LIST__UPDATE_TABLE_DATA`

export const LIST__SUBMIT_FORM_ASYNC
          = `${MOD_PREFIX}__LIST__SUBMIT_FORM_ASYNC`


const submitFormAsync = function(/*formData|pagination*/formData={}): ThunkResult {
    return async (dispatch, getState) => {
        dispatch({
            type: LIST__SUBMIT_FORM_ASYNC,
            payload: formData
        })
    }
}


const actions = {
    submitFormAsync,
}


export type IActionProps = typeof actions
export default actions