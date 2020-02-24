import { getCookie } from './libs/cookie'

/**
 * 截出字符串
 * @param search 
 * @param reg 
 */
interface ImatchSearch {
    (search: any, reg: RegExp): any
}
const matchSearch: ImatchSearch = (search, reg) => search && search.match(reg) && search.match(reg)[1] ? search.match(reg)[1] : null;

/**
 * 配合fetch 格式化body
 * @param params
 */
const stringifyParams = (params: object) => (
    Object.keys(params).map((key: string): string => (key + '=' + encodeURIComponent(params[key]))).join('&')
);

/**
 * 判断是否是ios
 * @returns {boolean}
 */
const isIos: () => boolean = () => {
    return /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)
};


/**
 * 判断是否是58app
 */
const is58App: () => boolean = () => {
    return /WUBA/i.test(navigator.userAgent) || getCookie('58ua') === '"58app"'
};

/**
 * 判断是否是微信
 */
const isWechat: () => boolean = () => {
    return (/micromessenger/i).test(window.navigator.userAgent.toLowerCase());
};



const getAbsoultePath: (href: string) => string = href => {
    let link = document.createElement('a');
    link.href = href;
    return (link.protocol + '//' + link.host + link.pathname + link.search + link.hash);
};


/**
 * 监听浏览器回退事件
 * @param actionToDo
 */
// @ts-ignore
type ACTIONTODO = (e: Event) => void
const pageBackFromNextPage = (actionToDo: ACTIONTODO): void => {

    // pageshow
    // UA.android && window.addEventListener('focus', actionToDo, false);
    window.addEventListener('pageshow', function (e) {
        if (e.persisted) {
            actionToDo(e);
        }
    }, false);

    // visibilityChange
    document.addEventListener('visibilitychange', function (e) {
        if (document.visibilityState === 'visible' || !document.hidden) {
            actionToDo(e);
        }
    }, false);

    // webkitVisibilityChange
    document.addEventListener('webkitVisibilitychange', function (e) {
        // @ts-ignore
        if (document.webkitVisibilityState === 'visible' || !document.webkitHidden) {
            actionToDo(e);
        }
    }, false);
};



/**
 * 获取URL 参数对象
 * @param query
 * @returns {{}}
 */
interface IgetRequestParams {
    (query: string): {[propName: string]: any}
}
const getRequestParams: IgetRequestParams = (query) => {
    let search = query.trim().replace(/^[?#&]/, '') || window.location.search.substring(1);
    return search ? JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}', function (key, value) {
        return key === "" ? value : decodeURIComponent(value);
    }) : {};
};


export {
    matchSearch,
    stringifyParams,
    isIos,
    isWechat,
    is58App,
    pageBackFromNextPage,
    getAbsoultePath,
    getRequestParams,
}
