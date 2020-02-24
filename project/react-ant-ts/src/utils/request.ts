import { startLoadingAnimation, stopLoadingAnimation } from './index'
import { isPostTypeJson } from './config'



function stringifyParams(params) {
    if (!params) return null;
    return Object.keys(params).map((key) => (key + '=' + encodeURIComponent(params[key]))).join('&');
}


function checkStatus(response) {
    if(response.status >= 200 && response.status < 300) {
        return response;
    } else {
        const error = new Error(response.statusText);
        // @ts-ignore
        error.response = response;
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
 */
export default {
    get: function(url: string, params?: object, headers?: object) {
        if (params && JSON.stringify(params)!=='{}') {
            url += '?' + stringifyParams(params)
        }
        
        startLoadingAnimation()
        
        return fetch(url, {
            method: "get",
            headers: Object.assign( {}, DEFAULT_HEADERS, {'referer-url': window.location.href}, headers ),
            credentials: 'include'
        })
        .then(checkStatus)
        .then((response) => response.json())
        .then((res) => {
            stopLoadingAnimation()
            return res
        })
        .catch(err => {
            stopLoadingAnimation()
            return err
        })
    },
    delete: function(url: string, params?: object, headers?: object) {
        if (params && JSON.stringify(params)!=='{}') {
            url += '?' + stringifyParams(params)
        }
        
        startLoadingAnimation()
        
        return fetch(url, {
            method: "delete",
            headers: Object.assign( {}, DEFAULT_HEADERS, {'referer-url': window.location.href}, headers ),
            credentials: 'include'
        })
        .then(checkStatus)
        .then((response) => response.json())
        .then((res) => {
            stopLoadingAnimation()
            return res
        })
        .catch(err => {
            stopLoadingAnimation()
            return err
        })
    },
    post: function(url: string, params?: object, headers?: object): Promise<any> {
        startLoadingAnimation()
        
        return fetch(url, {
            method: "post",
            headers: Object.assign( {}, DEFAULT_HEADERS, {'referer-url': window.location.href}, headers ),
            credentials: 'include',
            body: isPostTypeJson() ? JSON.stringify(params) : stringifyParams(params)
        })
        .then(checkStatus)
        .then((response) => response.json())
        .then((res) => {
            stopLoadingAnimation()
            return res
        })
        .catch(err => {
            stopLoadingAnimation()
            return err
        })
    },
    put: function(url: string, params?: object, headers?: object) {
        startLoadingAnimation()
        
        return fetch(url, {
            method: "put",
            headers: Object.assign( {}, DEFAULT_HEADERS, {'referer-url': window.location.href}, headers ),
            credentials: 'include',
            body: isPostTypeJson() ? JSON.stringify(params) : stringifyParams(params)
        })
        .then(checkStatus)
        .then((response) => response.json())
        .then((res) => {
            stopLoadingAnimation()
            return res
        })
        .catch(err => {
            stopLoadingAnimation()
            return err
        })
    }
}
