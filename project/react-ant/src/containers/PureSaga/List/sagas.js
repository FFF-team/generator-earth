import { put, takeEvery, takeLatest, delay, all, call } from 'redux-saga/effects'

import { CURRENT_PAGE, PAGE_SIZE, TOTAL, RESPONSE_DESTRUST_KEY,
    RESPONSE_LIST_DESTRUST_KEY } from 'ROOT_SOURCE/base/BaseConfig'

import request from 'ROOT_SOURCE/utils/request'

import { MOD_PREFIX } from '../constants'
import {
    LIST__UPDATE_FORM_DATA,
    LIST__UPDATE_TABLE_DATA,
    LIST__SUBMIT_FORM_ASYNC,
} from './actions'


function* submitFormAsync(action) {
    
    // 初始化antd-table-pagination
    let _formData = Object.assign(
        {[PAGE_SIZE]: 10, [CURRENT_PAGE]: 1},
        action.payload,
    )
    
    // 请求server数据
    let result = yield call(request.post, '/asset/getAsset', _formData)
    
    if (!result) { return; }
    
    
    // 解构server结果
    let resultBody = result[RESPONSE_DESTRUST_KEY]
    
    if (!resultBody) { return; }
    
    // 更新formData
    yield put({ type: LIST__UPDATE_FORM_DATA, payload: {
        ..._formData,
        [TOTAL]: resultBody[TOTAL],
    } })
    
    // 更新tableData
    yield put({ type: LIST__UPDATE_TABLE_DATA, payload: {
        dataSource: resultBody[RESPONSE_LIST_DESTRUST_KEY],
    } })
    
    
}


export default function* asyncSagas() {
    yield all([
        yield takeEvery(LIST__SUBMIT_FORM_ASYNC, submitFormAsync),
    ])
}
