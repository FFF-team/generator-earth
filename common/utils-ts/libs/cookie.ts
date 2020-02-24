/**
 * setCookie
 * @param key
 * @param value
 * @param days
 */

 /**
  * caoxuewei:
  * Note: toGMTString() is deprecated and should no longer be used. 
  * It remains implemented only for backward compatibility; 
  * please use toUTCString() instead.
  * 若在ts中使用toGMTString方法的话，可以手动添加接口，如下
  * interface Date {
  *     toGMTString(): string
  * }
  */
export const setCookie = (key: string, value: any, days: number) => {

    let expires: string;

    if (days) {

        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));

        expires = `; expires=${date.toUTCString()}`;

    } else {

        expires = '';

    }

    document.cookie = key + '=' + value + expires + '; path=/';

};

/**
 * getCookie
 * @param key
 * @returns {*}
 */
export const getCookie = (key: string): any => {

    let keyEQ = key + '=';
    let itemList = document.cookie.split(';');
    for (let i = 0, len = itemList.length; i < len; i++) {

        let item = itemList[i];
        item = item.replace(/(^\s*)/g, '');

        if (item.indexOf(keyEQ) === 0) {

            return item.substring(keyEQ.length, item.length);

        }

    }

    return null;

};