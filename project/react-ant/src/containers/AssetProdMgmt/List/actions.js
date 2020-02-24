import { CURRENT_PAGE, PAGE_SIZE, TOTAL, RESPONSE_DESTRUST_KEY, RESPONSE_LIST_DESTRUST_KEY } from 'ROOT_SOURCE/base/BaseConfig'
import ActionFactory from 'ROOT_SOURCE/base/ActionFactory'
import { MOD_PREFIX } from '../constants'


export const LIST__UPDATE_FORM_DATA
          = `${MOD_PREFIX}__LIST__UPDATE_FORM_DATA`

export const LIST__UPDATE_TABLE_DATA
          = `${MOD_PREFIX}__LIST__UPDATE_TABLE_DATA`



const updateTable = ActionFactory.createUpdateTable({
    
    url: '/asset/getAsset',
    
    type: 'post',
    
    handler: (dispatch, getState, formData, resultBody) => {
        
        // 更新formData
        dispatch({
            type: LIST__UPDATE_FORM_DATA,
            payload: {
                ...formData,
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
    },
    
})



export default {
    updateTable,
}
