module.exports = function(req, res, params, utils) {

    var result = require('./getList.get.json')

    return utils.paging(result, params)

}
