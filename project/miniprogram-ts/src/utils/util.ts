const isDev = wx.getSystemInfoSync().platform === 'devtools';


const formatTime = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    return (
        `${[year, month, day].map(formatNumber).join('/')
        } ${
            [hour, minute, second].map(formatNumber).join(':')}`
    );
};


const formatNumber = (n: number) => {
    const s = n.toString();

    return s[1] ? s : `0${s}`;
};


const whatType: IAnyObject = {};
const types = ['Array', 'Boolean', 'Date', 'Number', 'Object', 'RegExp', 'String', 'Error', 'Function', 'Promise'];

for (let i = 0, len = types.length; i < len; i++) {
    const c = types[i];

    whatType[`is${c}`] = ((type: string) => (arg: any) => Object.prototype.toString.call(arg) === `[object ${type}]`)(c);
}


const getUid = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    // eslint-disable-next-line no-mixed-operators
    const v = c === 'x' ? r : (r & 0x3 | 0x8);

    return v.toString(16);
});


/**
 * @description 截流函数
 * @param fn type:function 要被截留的函数
 * @param time type:numebr 函数调用间隔时间
 * @param ctx type:object 上下文this指向
 * @return function
 */
const throttle = (fn: (...params: any[]) => any, time = 200, ctx?: any) => {
    let previous: any = null;

    return function callback(this: any, ...reset: any[]) {
        console.log(ctx);
        const now = +new Date();
        const context = ctx || this;
        const args = reset;

        if (!previous) previous = now;
        const remaining = now - previous;

        if (time && (remaining >= time || remaining === 0)) {
            fn.apply(context, args);
            previous = now;
        }
    };
};

export {
    isDev,
    formatTime,
    formatNumber,
    whatType,
    getUid,
    throttle,
};
