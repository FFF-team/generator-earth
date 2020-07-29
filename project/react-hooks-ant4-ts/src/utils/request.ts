import moment from 'moment'
import { isPlainObject } from 'lodash'
import {
    startLoadingAnimation,
    stopLoadingAnimation,
    uuidv4,
} from './index'
import { isPostTypeJson } from './config'
import { formatDate } from './fieldFormatter'


export function getUrlWithParamsAndUuid(url: string, params?: IAnyObject): string {
    if (!params || !isPlainObject(params)) params = {}

    let conn: string

    if (url.indexOf('?') === -1) {
        conn = '?'
    } else if (/\?$/.test(url)) {
        conn = ''
    } else {
        conn = '&'
    }

    params.reqid = uuidv4()
    return `${url}${conn}${stringifyParams(params)}`
}


export function formatParams({
    __formate__,
    ...params
}: any = {}, cb?: (v: any) => any): object {
    try {
        const _values = {}
        Object.keys(params).forEach((k) => {
            let v = params[k]
            if (v === undefined) {
                return
            }
            if ([null, NaN].indexOf(v) > -1) {
                v = ''
            }

            // handle moment obj
            const format = __formate__ ? __formate__[k] : undefined
            if (moment.isMoment(v)) {
                v = formatDate(v, format)
            }
            if (Array.isArray(v) && moment.isMoment(v[0])) {
                v = v.map(d => formatDate(d, format))
            }

            _values[k] = cb ? cb(v) : v
        })
        return _values
    } catch (e) {
        console.log(e)
        return params
    }
}


export function stringifyParams(params?: IAnyObject): string {
    if (!isPlainObject(params)) params = {}
    const _params = formatParams(params, (value) => (typeof value === 'object' ? JSON.stringify(value) : value))
    return Object.keys(_params).map((key) => (key + '=' + encodeURIComponent(_params[key]))).join('&')
}


export function getRequsetBody(params: IAnyObject): string {
    return isPostTypeJson() ? JSON.stringify(formatParams(params)) : stringifyParams(params)
}


export function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    }
    const error = new Error(response.statusText)
    // @ts-ignore
    error.response = response
    throw error
}

export function toJson(response) {
    const contentType = response.headers.get('content-type') || ''
    if (/application\/json/.test(contentType)) {
        return response.json()
    }
    return response
}

export const DEFAULT_HEADERS = {
    'cache-control': 'no-cache',
    'X-Requested-With': 'Fetch',
    'Content-Type': isPostTypeJson() ?
        'application/json; charset=utf-8' :
        'application/x-www-form-urlencoded; charset=utf-8',
    'Accept': 'application/json',
}

/**
 * Requests a URL, returning a promise.
 */
export default {
    get: function (url: string, params: IAnyObject = {}, headers?: object, loading = true): Promise<any> {
        const _url = getUrlWithParamsAndUuid(url, params)

        loading && startLoadingAnimation()

        return fetch(_url, {
            method: 'get',
            headers: Object.assign({}, DEFAULT_HEADERS, { 'referer-url': window.location.href }, headers),
            credentials: 'include'
        })
            .then(checkStatus)
            .then(toJson)
            .then((res) => {
                loading && stopLoadingAnimation()
                return res
            })
            .catch(err => {
                loading && stopLoadingAnimation()
                return err
            })
    },
    delete: function (url: string, params: IAnyObject = {}, headers?: object, loading = true): Promise<any> {
        const _url = getUrlWithParamsAndUuid(url, params)

        loading && startLoadingAnimation()

        return fetch(_url, {
            method: 'delete',
            headers: Object.assign({}, DEFAULT_HEADERS, { 'referer-url': window.location.href }, headers),
            credentials: 'include'
        })
            .then(checkStatus)
            .then(toJson)
            .then((res) => {
                loading && stopLoadingAnimation()
                return res
            })
            .catch(err => {
                loading && stopLoadingAnimation()
                return err
            })
    },
    post: function (url: string, params: IAnyObject = {}, headers?: object, loading = true): Promise<any> {
        const _url = getUrlWithParamsAndUuid(url)

        loading && startLoadingAnimation()

        return fetch(_url, {
            method: 'post',
            headers: Object.assign({}, DEFAULT_HEADERS, { 'referer-url': window.location.href }, headers),
            credentials: 'include',
            body: getRequsetBody(params),
        })
            .then(checkStatus)
            .then(toJson)
            .then((res) => {
                loading && stopLoadingAnimation()
                return res
            })
            .catch(err => {
                loading && stopLoadingAnimation()
                return err
            })
    },
    put: function (url: string, params: IAnyObject = {}, headers?: object, loading = true): Promise<any> {
        const _url = getUrlWithParamsAndUuid(url)

        loading && startLoadingAnimation()

        return fetch(_url, {
            method: 'put',
            headers: Object.assign({}, DEFAULT_HEADERS, { 'referer-url': window.location.href }, headers),
            credentials: 'include',
            body: getRequsetBody(params),
        })
            .then(checkStatus)
            .then(toJson)
            .then((res) => {
                loading && stopLoadingAnimation()
                return res
            })
            .catch(err => {
                loading && stopLoadingAnimation()
                return err
            })
    }
}
