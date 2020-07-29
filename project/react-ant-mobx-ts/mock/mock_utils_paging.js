const projGlobalConfig = require('../src/projGlobalConfig.js')


const CURRENT_PAGE = projGlobalConfig.CURRENT_PAGE
const PAGE_SIZE = projGlobalConfig.PAGE_SIZE

const RESPONSE_DESTRUST_KEY = projGlobalConfig.RESPONSE_DESTRUST_KEY
const RESPONSE_LIST_DESTRUST_KEY = projGlobalConfig.RESPONSE_LIST_DESTRUST_KEY



const sliceList = (arr, currentPage, pageSize) => {
    return arr.slice( (currentPage-1)*pageSize, Math.min(currentPage*pageSize, arr.length) )
}


module.exports = function paging(whole_response_json, params) {

    let all = whole_response_json[RESPONSE_DESTRUST_KEY][RESPONSE_LIST_DESTRUST_KEY];

    // 无paging配置 则默认取全部
    whole_response_json[RESPONSE_DESTRUST_KEY][RESPONSE_LIST_DESTRUST_KEY] = sliceList(
        all,
        params[CURRENT_PAGE]||1,
        params[PAGE_SIZE]||all.length
    )

    return whole_response_json

}
