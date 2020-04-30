const projGlobalConfig = require('../src/projGlobalConfig')

const CURRENT_PAGE = projGlobalConfig.CURRENT_PAGE
const PAGE_SIZE = projGlobalConfig.PAGE_SIZE

const RESPONSE_DESTRUST_KEY = projGlobalConfig.RESPONSE_DESTRUST_KEY
const RESPONSE_LIST_DESTRUST_KEY = projGlobalConfig.RESPONSE_LIST_DESTRUST_KEY
const TOTAL = projGlobalConfig.TOTAL

const sliceList = (arr, currentPage, pageSize) => {
    return arr.slice((currentPage - 1) * pageSize, Math.min(currentPage * pageSize, arr.length))
}

module.exports = function paging(whole_response_json, params) {
    let data = whole_response_json[RESPONSE_DESTRUST_KEY][RESPONSE_LIST_DESTRUST_KEY];
    // 通过额外参数进行一次筛选 此判断只针对当前测试数据 如果有自定义则删除即可
    if (params.type === 'test' && params.name) {
        const _data = [];
        for (const val of data) {
            if (val.name === params.name) {
                _data.push(val);
            }
        }
        
        whole_response_json[RESPONSE_DESTRUST_KEY][TOTAL] = _data.length;
        data = _data;
    }
    
    whole_response_json[RESPONSE_DESTRUST_KEY][RESPONSE_LIST_DESTRUST_KEY] = sliceList(
        data,
        params[CURRENT_PAGE],
        params[PAGE_SIZE]
    )
    
    return whole_response_json
    
}
