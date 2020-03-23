import { Reducer } from 'redux'
import { ThunkAction } from 'redux-thunk'

//----------------------
// 补充TS对json对象的支持
//----------------------
export type JSONPrimitive = string | number | boolean | null;
export type JSONValue = JSONPrimitive | JSONObject | JSONArray;
export type JSONObject = { [member: string]: JSONValue };
export interface JSONArray extends Array<JSONValue> {}


/**
 * async action creator 返回的async action格式
 */
export type ThunkResult = ThunkAction<any, any, undefined, any>;

/**
 * 异步请求返回对象类型 {code, data?, msg?, ...}
 */
export interface IFetchResult {
    code: number,
    data?: any,
    msg?: string,
    [propName: string]: any,
}

/**
 * 所有页面的action都使用如下格式 {type, payload?}
 */
export type Action4All = { type: string, payload?: any };

/**
 * List页面的reducer返回格式 {formData, tableData, ...}
 */
export type Reducer4List = Reducer<{formData: any, tableData: any, [propName: string]: any}, Action4All>;