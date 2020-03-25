import { Dispatch, Store } from 'redux'
import request from 'ROOT_SOURCE/utils/request'
import { CURRENT_PAGE, PAGE_SIZE, RESPONSE_DESTRUST_KEY } from './BaseConfig'
import { ThunkResult } from 'ROOT_SOURCE/utils/types'


/**
 * restful 接口中，有时参数会被写在url里，需要动态替换
 * @param {String} url
 * @param {Object} options
 *
 * return newUrl
 */
// @ts-ignore
// function replaceUrlPartitionsIfNeeded(url: string, options: any) {
//     //url should NOT be changed
//     let newUrl = url

//     // in case params in url, e.g, /api/{recordId}
//     if (options.__urlPartitions) {

//         for ( let partition in options.__urlPartitions ) {
//             let rg = new RegExp( '{'+partition+'}' )
//             newUrl = newUrl.replace(rg, ''+options.__urlPartitions[partition])
//         }

//         delete options.__urlPartitions
//     }

//     return newUrl
// }


type Handler4CreateRequest = <T>(dispatch: Dispatch<any>, getState: ()=>Store<any>, resultBody: T) => T
type Handler4CreateUpdateTable = <T>(dispatch: Dispatch<any>, getState: ()=>Store<any>, formData: object, resultBody: T) => T

type RequestOptions = {
    url: string,
    type?: string,
    handler?: Handler4CreateRequest,
}
type UpdateTableOptions = {
    url: string,
    type?: string,
    handler?: Handler4CreateUpdateTable,
}




/**
 * 创建普通http request 的actionCreator
 *
 * @param {Object} options: {url: string, type: string, handler: Handler4CreateUpdateTable}
 * @returns action creator
 */
const createRequest: ((options: RequestOptions) => (p?: any) => ThunkResult) = ({url, type='get', handler}) => {
    return function (params) {

        let newUrl = url //replaceUrlPartitionsIfNeeded(url, params)

        return async (dispatch, getState) => {

            // 请求server数据
            let result = await request[type](newUrl, params)

            if (!result) { return; }

            return handler ? handler(dispatch, getState, result[RESPONSE_DESTRUST_KEY]) : undefined
        }
    }
}



/**
 * 创建提交表单以及分页时 更新table 所使用的actionCreator
 *
 * @param options: {url: string, type: string, handler: Handler4CreateUpdateTable}
 * @returns action creator
 */
const createUpdateTable: ((options: UpdateTableOptions) => (p?: any) => ThunkResult) = ({url, type='get', handler}) => {
    return function (/*formData|pagination*/formData) {

        let newUrl = url //replaceUrlPartitionsIfNeeded(url, formData)

        return async (dispatch, getState) => {

            // 初始化antd-table-pagination
            let _formData = Object.assign(
                {[PAGE_SIZE]: 10, [CURRENT_PAGE]: 1},
                formData,
            )

            // 请求server数据
            let result = await request[type](newUrl, _formData)

            if (!result) { return; }

            let resultBody = result[RESPONSE_DESTRUST_KEY]

            if (!resultBody) { return; }

            return handler ? handler(dispatch, getState, _formData, result[RESPONSE_DESTRUST_KEY]) : undefined
        }
    }
}



export default {
    createRequest,
    createUpdateTable,
}
