import { isPostTypeJson } from './config'

/**
 * demo
 *
 *
dedupRequest(url, request => {
    request.get(url).then(data => {
        console.log(data)
    })
})

 */


// 保存当前的请求历史
let unfinishedRequests = {};

function stringifyParams(params) {
    if (!params) return null;
    return Object.keys(params).map((key) => (key + '=' + encodeURIComponent(params[key]))).join('&');
};

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        const error:Error = new Error(response.statusText);
        error['response'] = response;
        throw error;
    }
}

const DEFAULT_HEADERS = {
    'cache-control': 'no-cache',
    'Content-Type': isPostTypeJson() ?
        'application/json; charset=utf-8' :
        'application/x-www-form-urlencoded; charset=utf-8',
    'Accept': 'application/json',
}

/**
 * Requests a URL, returning a promise.
 * 存放原始请求方法(原来基础之上修改了url的获取方式)
 */
const methods = {
    get: function(url, params, headers) {
        if (params && JSON.stringify(params) !== '{}') {
            url += '?' + stringifyParams(params)
        }

        return fetch(url, {
            method: "get",
            headers: Object.assign({}, DEFAULT_HEADERS, { 'referer-url': window.location.href }, headers),
            credentials: 'include'
        })
            .then(checkStatus)
            .then((response) => {
                unfinishedRequests[url] && delete unfinishedRequests[url]
                return response.json()
            })
            .then((res) => {
                // stopLoadingAnimation()
                return res
            })
            .catch(err => {
                unfinishedRequests[url] && delete unfinishedRequests[url]
                // stopLoadingAnimation()
                return err
            })
    },
    post: function(url, params, headers) {

        // startLoadingAnimation()

        return fetch(url, {
            method: "post",
            headers: Object.assign({}, DEFAULT_HEADERS, { 'referer-url': window.location.href }, headers),
            credentials: 'include',
            body: isPostTypeJson() ? JSON.stringify(params) : stringifyParams(params)
        })
            .then(checkStatus)
            .then((response) => {
                unfinishedRequests[url] && delete unfinishedRequests[url]
                return response.json()
            })
            .then((res) => {
                // stopLoadingAnimation()
                return res
            })
            .catch(err => {
                unfinishedRequests[url] && delete unfinishedRequests[url]
                // stopLoadingAnimation()
                return err
            })
    }
}

/**
 * 添加重复点击校验方法
 * @param { String }    url     需要校验的url
 * @param { Function }  cb      校验通过后的回调
 */
export const dedupRequest = (url, cb) => {
    if (unfinishedRequests[url]) return;
    unfinishedRequests[url] = true;

    cb && cb(methods);
};




export default methods;
