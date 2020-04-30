/**
 * Created by Chuans on 2019/2/21
 * Author: Chuans
 * Github: https://github.com/chuans
 * Time: 3:43 PM
 */
import * as React from 'react';
import { Pagination } from 'ROOT_SOURCE/interface/common';
import CommonTableStore from 'ROOT_SOURCE/components/common-table-list/store';
import { FormComponentProps } from 'antd/lib/form'

/**
 * 当前核心组件的所有参数和说明
 */
export interface IProps {
    // 主核心filter 和 table
    FT: React.ComponentClass | React.ComponentProps<any>;

    // 当前绑定的接口地址
    url: string;

    /**
     * 当前菜单的唯一ID值
     * @desc    用于自己需要处理数据的键名
     * @default  随机字符串
     */
    sourceId: string | number;

    /**
     * 接口获取类型
     * @default  get
     */
    type?: string;

    /**
     * 是否显示loading
     * @default true
     */
    isShowLoading?: boolean;

    /**
     * 额外提交到后端的参数
     */
    extraParams?: Object;

    /**
     * 是否开启用来保存所有页面内容
     * 用来保存所有页面内容 如果正常不建议开启此配置
     * 用来处理 多个路由应用同一个组件  数据不更新的情况
     * @default false
     */
    isSaveAllPage?: boolean;

    /**
     * 当前的分页数据
     */
    pagination?: Pagination;


    commonTableStore: CommonTableStore;
}


export interface IFormTable extends FormComponentProps {
    store: CommonTableStore;
    sourceId: string;
    getData: (params?: object) => object
}
