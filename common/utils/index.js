import { getCookie } from './libs/cookie'

const matchSearch = (search, reg) => search.match(reg) && search.match(reg)[1] ? search.match(reg)[1] : null;

/**
 * 配合fetch 格式化body
 * @param params
 */
const stringifyParams = (params) => (
    Object.keys(params).map((key) => (key + '=' + encodeURIComponent(params[key]))).join('&')
);

/**
 * 判断是否是ios
 * @returns {boolean}
 */
const isIos = () => {
    return /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)
};


/**
 * 判断是否是58app
 */
const is58App = () => {
    return /WUBA/i.test(navigator.userAgent) || getCookie('58ua') === '"58app"'
};

/**
 * 判断是否是微信
 */
const isWechat = () => {
    return (/micromessenger/i).test(window.navigator.userAgent.toLowerCase());
};



const getAbsoultePath = href => {
    let link = document.createElement('a');
    link.href = href;
    return (link.protocol + '//' + link.host + link.pathname + link.search + link.hash);
};


/**
 * 监听浏览器回退事件
 * @param actionToDo
 */
const pageBackFromNextPage =(actionToDo) => {

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
const getRequestParams = (query) => {
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
