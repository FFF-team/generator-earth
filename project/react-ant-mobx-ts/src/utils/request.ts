import { isPostTypeJson } from './config'

function stringifyParams(params) {
    if (!params) return null;
    return Object.keys(params).map((key) => (key + '=' + encodeURIComponent(params[key]))).join('&');
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        const error:any = new Error(response.statusText);
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

async function toJson(response){

    if((response.headers.get('content-type') || '').indexOf('application/msexcel') > -1){
        return response
    }else{
        return response.json();
    }

}


/**
 * Requests a URL, returning a promise.
 */
const request = {
    get: function(url, params={}, headers={}) {
        if (params && JSON.stringify(params) !== '{}') {
            url += '?' + stringifyParams(params)
        }

        return fetch(url, {
            method: 'get',
            headers: Object.assign({}, DEFAULT_HEADERS, { 'referer-url': window.location.href }, headers),
            credentials: 'include'
        })
            .then(checkStatus)
            .then(toJson)
            .then((res) => {
                return res
            })
            .catch(err => {
                return err
            })
    },
    post: async function(url, params={}, headers = {}, isFormData = false,) {

        let body:any = isPostTypeJson() ? JSON.stringify(params) : stringifyParams(params);
        let defaultHeaders:any = DEFAULT_HEADERS;

        if (isFormData) {
            body = params;
            defaultHeaders = {
                'cache-control': 'no-cache',
                'Accept': '*/*',
            }
        }

        return fetch(url, {
            method: 'post',
            headers: Object.assign({}, defaultHeaders, { 'referer-url': window.location.href }, headers),
            credentials: 'include',
            body,
        })
            .then(checkStatus)
            .then(toJson)
            .then((res) => {
                return res
            })
            .catch(err => {
                return err
            })
    }
}


export const downloadFile = (url)=>{

    return new Promise(async(resolve,reject)=>{
        let res;
        try{
            res = await request.post(url);

            let filename = res.headers.get('Content-Disposition').match(/filename=(.*)/) || []; //获取文件名
            let blob = await res.blob();

            const fileUrl = window.URL.createObjectURL(blob);
            resolve();
            let a = document.createElement('a');

            a.href = fileUrl;
            a.download = filename[1] || '文件.zip';
            a.click();
            window.URL.revokeObjectURL(fileUrl);

        }catch(e){
            reject(e)
            return;
        }
    })
}


export default request
