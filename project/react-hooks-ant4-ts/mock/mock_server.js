const http = require('http');
const fs = require('fs');
const path = require('path');
const URL = require('url');
const querystring = require('querystring');
//let request = require('request').defaults({jar: true});

// paging utils
const paging = require('./mock_utils_paging');


const PORT = 8004;



const getMockFileFullPathWithoutDotOrSuffix = req => (
    path.join( __dirname, '../mock', URL.parse(req.url).pathname + '.' + req.method.toLowerCase() )
)



const fileExists = filePath => {
    try { return fs.statSync(filePath).isFile() }
    catch (err) { return false }
}



const empty = map => {
    Object.keys(map).forEach(key => delete map[key])
}



const isFormUrlencode = req => (
    req.headers['content-type'].toLowerCase() === 'application/x-www-form-urlencoded'
)





/*
 * return:
 * 
{ pageSize: 10,
  pageNo: 3,
  assetCode: '',
  assetName: '',
  contract: '',
  total: 22 }
 */
const parseParams = req => {
    
    if (req.method.toLowerCase()==='get') {
        /* 
         * urlObj
         * 
            search: '?a=b',
            query: 'a=b',
            pathname: '/asset/getAsset',
            path: '/asset/getAsset?a=b',
            href: '/asset/getAsset?a=b'
         */
        let urlObj = URL.parse(req.url)
        let queryObj = querystring.parse(urlObj.query)
        
        return new Promise(function(resolve, reject) {
            resolve(queryObj)
        })
    
    
    } else if (req.method.toLowerCase()==='post') {
        
        return new Promise(function(resolve, reject) {
            let data = ''
            req.on('data', function (chunk) {
                data += chunk;
            })
            req.on('end', function () {
                try {
                    let queryObj = isFormUrlencode(req) ?
                        
                        // case x-www-form-urlencoded
                        querystring.parse(decodeURI(data)) :
                        // otherwise
                        JSON.parse(decodeURI(data))
                    
                    resolve(queryObj)
                } catch (e) {
                    reject(e)
                }
            })
        })
        
    }
}





http.createServer(async (req, res) => {
    if ( req.url.indexOf('favicon.ico') != -1 ) { return ''; }
    
    
    // 必须前置，否则中文乱码
    res.setHeader('Content-Type', 'application/json; charset="utf-8')
    
    
    // 获取mock文件的全路径，不带后缀
    const filePathWithoutSuffix = getMockFileFullPathWithoutDotOrSuffix(req)
    
    
    // 如果是.js的话，执行该文件并返回结果
    if ( fileExists(filePathWithoutSuffix + '.js') ) {
        
        // 重新加载执行.js
        empty(require.cache)
        
        try {
            let params = await parseParams(req)
            let r = require(filePathWithoutSuffix)(req, res, params, {paging: paging})
            r = typeof r==='string' ? r : JSON.stringify(r)
            res.statusCode = 200
            res.end(r)
        } catch (e) {
            res.statusCode = 404
            res.end(e.stack)
        }
        
        return;
    }
    
    
    // 如果是.json的话，读取并pipe(res)
    if ( fileExists(filePathWithoutSuffix + '.json') ) {
        
        fs
            .createReadStream(filePathWithoutSuffix + '.json', {encoding: 'utf8'})
            .on('finish', () => {
                res.statusCode = 200
            })
            .on('error', (e) => {
                res.statusCode = 404
                res.end(e.stack)
            })
            .pipe(res)
        
        return;
    }
    
    
    res.statusCode = 404
    res.end(`${filePathWithoutSuffix}路径的没有对应的mock文件`)
})
.listen(PORT, () => {
	console.log(`Json Server running at http://localhost:${PORT}/`);
});

