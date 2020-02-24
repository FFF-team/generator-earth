import request from 'ROOT_SOURCE/utils/request'
import { ThunkResult, IFetchResult } from 'ROOT_SOURCE/utils/types'
import { CURRENT_PAGE, PAGE_SIZE, TOTAL,
    RESPONSE_DESTRUST_KEY, RESPONSE_LIST_DESTRUST_KEY } from 'ROOT_SOURCE/base/BaseConfig'
import { MOD_PREFIX } from '../constants'


export const LIST__UPDATE_FORM_DATA = `${MOD_PREFIX}__LIST__UPDATE_FORM_DATA`
export const LIST__UPDATE_TABLE_DATA = `${MOD_PREFIX}__LIST__UPDATE_TABLE_DATA`


const updateTable = function (/*formData|pagination*/formData={}) : ThunkResult {
    return async (dispatch, getState) => {
        
        // 初始化antd-table-pagination
        let _formData = Object.assign(
            {[PAGE_SIZE]: 10, [CURRENT_PAGE]: 1},
            formData,
        )
        
        // 请求server数据
        let result: IFetchResult = await request.post('/asset/getAsset', _formData)
        
        if (!result) { return; }
        
        
        // 解构server结果
        let resultBody = result[RESPONSE_DESTRUST_KEY]
        
        if (!resultBody) { return; }
        
        // 更新formData
        dispatch({
            type: LIST__UPDATE_FORM_DATA,
            payload: {
                ..._formData,
                [TOTAL]: resultBody[TOTAL],
            }
        })
        
        // 更新tableData
        dispatch({
            type: LIST__UPDATE_TABLE_DATA,
            payload: {
                dataSource: resultBody[RESPONSE_LIST_DESTRUST_KEY],
            }
        })
        
        return resultBody
    }
}


const actions = {
    updateTable,
}


export type IActionProps = typeof actions
export default actions