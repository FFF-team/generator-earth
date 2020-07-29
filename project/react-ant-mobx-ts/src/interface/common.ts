/**
 * Created by Chuans on 2019/2/21
 * Author: Chuans
 * Github: https://github.com/chuans
 * Time: 8:41 PM
 */
export interface Pagination {
    pageSize: number;
    // 项目内使用的名字
    pageNo?: number;
    // 用于antd的分页
    current?: number;
    total?: number;
    showTotal?:any
}

/**
 * 请求需要的参数说明
 */
export interface RequestParams {
    // 请求地址
    url: string;
    // 请求类型
    type: string;
    // 用于存放单个组件的值
    sourceId: string | number;
    // 请求参数
    params?: object | any;
    // 自定义headers
    headers?: object | any
}

/**
 * 请求回调参数
 */
export interface ResultParams {
    code: number;
    data: any;
    msg: string;
}

/**
 * 每个页面存在相应列表的数据
 */
export interface AllDataSourceParams {
    list: Array<any>;
    pageSize: number;
    pageNo: number;
    total?: number;
}


