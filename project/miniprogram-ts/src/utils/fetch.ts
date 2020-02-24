import {
    isDev,
    whatType,
} from './util';


const HOST = isDev ? 'http://localhost:9001' : '';
const defaultFetchAutoConfig = {
    loading: true,
    toastError: true,
    login: false,
    header: {}, // header信息
};


type TFetchConfig = Partial<typeof defaultFetchAutoConfig>;
enum FETCH_ERROR_CODE {
    // 请求失败
    'REQUEST_FAILED' = 'REQUEST_FAILED',
    // statusCode不为200
    'STATUS_NOT_200' = 'STATUS_NOT_200',
    // 服务端返回的数据格式不正确
    'RESPONSE_DATA_FORMAT_ERROR' = 'RESPONSE_DATA_FORMAT_ERROR'
}


// 格式化参数，预处理
function formatOptions(params?: IAnyObject) {
    if (!params || !whatType.isObject(params)) return {};
    try {
        const _values: IAnyObject = {};

        Object.keys(params).forEach((k) => {
            let v = params[k];

            if ([undefined, null, NaN].indexOf(v) !== -1) v = '';

            _values[k] = v;
        });

        return _values;
    } catch (e) {
        return params;
    }
}


/**
 * @description: 登录检查方法
 * @param {IAnyObject} data: 响应数据对象
 * @return: true | false; true: 已登录，false: 未登录
 */
// function handleCheckLogin(data: IAnyObject) {
//     // TODO: 登录校验逻辑处理
//     console.log(data);

//     return true;
// }


/**
 * @description: 错误处理方法
 * @param {IAnyObject} data: 错误信息对象
 * @param {TFetchConfig} config: 用户配置对象
 * @return: void
 */
function handleError(data: IAnyObject, config: TFetchConfig) {
    // auto show toast error
    if (config && config.toastError) {
        wx.showToast({
            title: data.toastMsg,
            icon: 'none',
        });
    }
}


function _fetch(
    url: string,
    method: 'GET' | 'POST',
    params?: IAnyObject,
    config: TFetchConfig = defaultFetchAutoConfig,
): Promise<any> {
    let RequestTask: any;
    const fetchPromise: any = new Promise((resolve, reject) => {
        // auto show loading
        if (config.loading) {
            wx.showLoading({
                title: '加载中',
                mask: true,
            });
        }

        // 格式化url
        let _url = '';

        if (/^\/\//.test(url)) {
            _url = `https:${url}`;
        } else if (/^https:/.test(url)) {
            _url = url;
        } else {
            _url = `${HOST}${url}`;
        }

        RequestTask = wx.request({
            url: _url,
            data: formatOptions(params),
            method,
            header: {
                'content-type': 'application/json; charset=utf-8',
                'cache-control': 'no-cache',
                ...(config.header || {}),
            },
            dataType: 'json',
            responseType: 'text',
            success(res): void {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    resolve(res.data);

                    return;
                }

                // 状态码值大于 300 的情况
                const _response = {
                    ...res,
                    toastMsg: `服务异常，响应状态码${res.statusCode}`,
                    errCode: FETCH_ERROR_CODE.STATUS_NOT_200,
                };

                handleError(_response, config);
                reject(_response);
            },
            fail(err): void {
                const _response = {
                    toastMsg: `请求失败，${err.errMsg}`,
                    errCode: FETCH_ERROR_CODE.REQUEST_FAILED,
                };

                handleError(_response, config);
                reject(_response);
            },
            complete(): void {
                // auto hide loading
                if (config.loading) {
                    wx.hideLoading({});
                }
            },
        });
    });

    fetchPromise.RequestTask = RequestTask;

    return fetchPromise;
}


const fetch = {
    get(url: string, params?: IAnyObject, config?: TFetchConfig): Promise<any> {
        return _fetch(url, 'GET', params, config);
    },
    post(url: string, params?: IAnyObject, config?: TFetchConfig): Promise<any> {
        return _fetch(url, 'POST', params, config);
    },
};


const fetchWithLogin = {
    get(url: string, params?: IAnyObject, config: TFetchConfig = defaultFetchAutoConfig): Promise<any> {
        return _fetch(url, 'GET', params, { ...config, login: true });
    },
    post(url: string, params?: IAnyObject, config: TFetchConfig = defaultFetchAutoConfig): Promise<any> {
        return _fetch(url, 'POST', params, { ...config, login: true });
    },
};


export {
    fetch,
    fetchWithLogin,
};
