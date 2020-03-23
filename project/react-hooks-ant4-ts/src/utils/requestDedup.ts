import { startLoadingAnimation, stopLoadingAnimation } from './index'
import {
    getUrlWithParamsAndUuid,
    getRequsetBody,
    checkStatus,
    toJson,
    DEFAULT_HEADERS,
} from './request'

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

/**
 * Requests a URL, returning a promise.
 * 存放原始请求方法(原来基础之上修改了url的获取方式)
 */
const methods = {
    get: function (url, params, headers, loading = true) {
        const _url = getUrlWithParamsAndUuid(url, params)

        loading && startLoadingAnimation()

        return fetch(_url, {
            method: "get",
            headers: Object.assign({}, DEFAULT_HEADERS, { 'referer-url': window.location.href }, headers),
            credentials: 'include'
        })
            .then(checkStatus)
            .then(toJson)
            .then((res) => {
                unfinishedRequests[url] && delete unfinishedRequests[url]
                loading && stopLoadingAnimation()
                return res
            })
            .catch(err => {
                unfinishedRequests[url] && delete unfinishedRequests[url]
                loading && stopLoadingAnimation()
                return err
            })
    },
    post: function (url, params, headers, loading = true) {
        const _url = getUrlWithParamsAndUuid(url)

        loading && startLoadingAnimation()

        return fetch(_url, {
            method: "post",
            headers: Object.assign({}, DEFAULT_HEADERS, { 'referer-url': window.location.href }, headers),
            credentials: 'include',
            body: getRequsetBody(params),
        })
            .then(checkStatus)
            .then(toJson)
            .then((res) => {
                unfinishedRequests[url] && delete unfinishedRequests[url]
                loading && stopLoadingAnimation()
                return res
            })
            .catch(err => {
                unfinishedRequests[url] && delete unfinishedRequests[url]
                loading && stopLoadingAnimation()
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

    return cb && cb(methods);
};



export default methods;
