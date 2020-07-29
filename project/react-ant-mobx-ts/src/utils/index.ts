import * as uuid from 'uuid/v4';

export const sleep = (n): Promise<any> => {
    return new Promise(resolve => {
        setTimeout(() => resolve(), n);
    })
}


/**
 * 获取一个随机串
 */
export const getUUID = (): string => {
    const id: string = uuid();

    return id.replace(/-/ig, '');
}


export const createURL = (url: string, param: Object): string => {
    let urlLink = '';
    for (let key in param) {
        let link = `&${key}=${param[key]}`;
        urlLink += link;
    }

    urlLink = url + '?' + urlLink.substr(1);
    return urlLink.replace(' ', '');
}
