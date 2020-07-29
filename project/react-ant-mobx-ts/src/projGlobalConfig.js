const POST_TYPE_FORM = 'application/x-www-form-urlencoded; charset=utf-8'
const POST_TYPE_JSON = 'application/json; charset=utf-8'

/**
 * 本配置文件会同时被react及mock_server用到，由于nodejs尚未支持ES6 import/export
 * 所以这里使用ES5的module.exports
 */
module.exports = {
    
    isPostTypeJson: function () {
        return true
    },
    
    
    
    /*
     * ant-d的pagination使用`pageSize`和`current`代表每页记录条数和当前页码，使用`total`代表所有记录条数
     * 而我们和rd之间的约定则是`[PAGE_SIZE]`和`[CURRENT_PAGE]`代表每页记录条数和当前页码
     * 
     * 因此组件初始化时，将 this.state.pagination 设置为 [PAGE_SIZE]=10, [CURRENT_PAGE]=1
     * 首次发送请求时 [PAGE_SIZE]=10, [CURRENT_PAGE]=1
     * 
     * 接收rd返回数据时，将pagination.total设置为具体值(这里为result.data.total)
     * 
     * 翻页时，更新this.state.pagination的page: antd.table的onChange函数会把pagination传出来
     * 
     */
    CURRENT_PAGE: 'pageNo',
    PAGE_SIZE: 'pageSize',
    TOTAL: 'total',
    
    
    /**
     * Suppose前端的任何请求，后端都返回同样的格式，如
     * {
     *     code: 0,
     *     msg: 'success',
     *     data: {}或[]
     * }
     * 
     * 这里我们最好设置一个统一解构的key值，方便框架将 res[RESPONSE_DESTRUST_KEY] 返回
     */
    RESPONSE_DESTRUST_KEY: 'data',
    RESPONSE_LIST_DESTRUST_KEY: 'list'
    
}







