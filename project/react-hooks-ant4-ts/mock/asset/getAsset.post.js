module.exports = function(req, res, params, utils) {
    
    var result = require('./getAsset.post.json')
    
    return utils.paging(result, params)
    
}
