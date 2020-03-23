import store from './store'
import { GLOBAL_LOADING } from 'ROOT_SOURCE/actions/framework'



export const sleep = (n: number = 0) => {
    return new Promise(resolve => {
        setTimeout(() => resolve(), n)
    })
}



/**
* @description：requset loading show && close
*/
const {
    startLoadingAnimation,
    stopLoadingAnimation
} = (function () {
    let startLoading = 0;
    let endLoading = 0;
    return {
        startLoadingAnimation() {
            startLoading += 1;
            if (store.getState().globalLoading) { return; }
            store.dispatch({
                type: GLOBAL_LOADING,
                payload: true,
            });
        },
        stopLoadingAnimation() {
            endLoading += 1;
            if (startLoading !== endLoading) { return; }
            startLoading = 0;
            endLoading = 0;
            store.dispatch({
                type: GLOBAL_LOADING,
                payload: false,
            });
        }
    }
})();

export {
    startLoadingAnimation,
    stopLoadingAnimation,
}



/**
* @description：生成requset id func，方便node服务跟踪请求
*/
export const uuidv4 = () => "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    // eslint-disable-next-line
    const v = c == "x" ? r : (r & 0x3 | 0x8);
    return v.toString(16);
});



/**
* @description：防抖函数
*/
export function debounce(fn, delay = 500) {
    let _timer;
    return function cb(this: any, ...args): any {
        (_timer !== undefined) && clearTimeout(_timer);
        _timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}
