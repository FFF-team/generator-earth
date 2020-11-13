import { useState, useEffect } from 'react'

import { startLoadingAnimation, stopLoadingAnimation } from './index'
import { isPostTypeJson } from './config'


const DEFAULT_HEADERS = {
    'cache-control': 'no-cache',
    'Content-Type': isPostTypeJson() ?
        'application/json; charset=utf-8' :
        'application/x-www-form-urlencoded; charset=utf-8',
    'Accept': 'application/json',
}



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





const useHooksDemo = (method, url, params, headers) => {
    console.log(method, url, params, headers);
    let [{ data, isLoading, isError }, setReqObj] = useFetchHooks({
        method, url, params, headers
    });
    console.log(data, isLoading, isError, setReqObj);
}
//useHooksDemo('post', '/asset/addAsset', undefined, undefined);


const useFetchHooks = (
    params: {method: string, url: string, params?: any, headers?: any},
): [status: {data: any, isLoading: boolean, isError: boolean}, setReqObj: Function] => {
    const [data, setData] = useState();
    const [reqObj, setReqObj] = useState(params);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
   
    useEffect(() => {
        const fetchData = async () => {
            setIsError(false);
            setIsLoading(true);
    
            try {
                //@ts-ignore
                const result = await _fetch4hooks(reqObj.method, reqObj.url, reqObj.params, reqObj.headers);
                setData(result.data);
            } catch (error) {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
      };
   
      fetchData();
    }, [reqObj]);
   
    return [{ data, isLoading, isError }, setReqObj];
};




function _fetch4hooks(method: 'get'|'post', url: string, params?: object, headers?: object) {
    
    if (method==='get') {
        if (params && JSON.stringify(params)!=='{}') {
            url += '?' + stringifyParams(params)
        }
    }

    let fetchConfig = {
        method,
        headers: Object.assign( {}, DEFAULT_HEADERS, {'referer-url': window.location.href}, headers ),
        credentials: 'include',
    };

    if (method==='post') {
        //@ts-ignore
        fetchConfig.body = isPostTypeJson() ? JSON.stringify(params) : stringifyParams(params);
    }
    
    //@ts-ignore
    return fetch(url, fetchConfig)
    .then(checkStatus)
    .then((response) => response.json())
    .then((res) => {
        return res
    })
    .catch(err => {
        return err
    })
}




/**
 * Requests a URL, returning a promise.
 */
export default {
    useFetchHooks,

    get: function(url: string, params?: object, headers?: object) {
        if (params && JSON.stringify(params)!=='{}') {
            url += '?' + stringifyParams(params)
        }
        
        startLoadingAnimation()
        
        return fetch(url, {
            method: 'get',
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
            method: 'post',
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
}
