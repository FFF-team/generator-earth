/**
 * Created by Chuans on 2019/2/21
 * Author: Chuans
 * Github: https://github.com/chuans
 * Time: 8:38 PM
 */
import { action, observable } from 'mobx';
import { message } from 'antd';
import { RequestParams, ResultParams, AllDataSourceParams } from 'ROOT_SOURCE/interface/common';
import request from 'ROOT_SOURCE/utils/request';
import { RootStore } from 'ROOT_SOURCE/pages/index/store';

class CommonTableStore {

    rootStore:RootStore;

    constructor(store:RootStore) {
        this.rootStore = store;
    }

    /**
     * 用来保存所有页面内容 如果正常不建议开启此配置 详情请查看当前目录下的interface文件
     * 默认关闭
     */
    @observable allPageContainer: any = {};

    /**
     * 存放所有的数据源
     */
    @observable allDataSource: any = {};


    /**
     * 用来保存所有请求数据相关的url 和 type
     */

    @observable allRequestInfo: any = {};

    /**
     * 当前加载状态
     */
    @observable isLoading: boolean = false;

    /**
     * 获取数据主方法
     * @desc 参数详情 请查看RequestParams
     */
    @action
    async getData({url, type, sourceId, params = {}, headers = {}}: RequestParams): Promise<any> {
        const {commonTableStore:store} = this.rootStore;

        const info: AllDataSourceParams = store.allDataSource[sourceId];

        // 如果没传参数 则吧默认值传进去
        params = {
            pageSize: info.pageSize,
            pageNo: info.pageNo,
            ...params
        }

        store.isLoading = true;

        const result: ResultParams = await request[type](url, params, headers);

        store.setState({isLoading: false});

        // 值不存在的时候
        if (!result) {
            return message.error('请求异常');
        }

        // 当code 为其他值 请求失败的时候
        if (result.code !== 0) {
            return message.error(result.msg);
        }

        store.setDataSource(sourceId, {
            ...result.data,
            ...params,
        });

        // 设置请求相关的url 和 type
        if (!store.allRequestInfo[sourceId]) {
            store.setSubState('allRequestInfo', sourceId, {url, type});
        }

        return result;
    }

    /**
     * 设置二级state
     */
    @action.bound
    setSubState(key1, key2, value) {
        const {commonTableStore:store} = this.rootStore;

        store[key1][key2] = value;
    }


    @action.bound
    setState(obj: Object) {
        const {commonTableStore:store} = this.rootStore;

        for (const key in obj) {
            store[key] = obj[key];
        }
    }

    /**
     * 这里设置异步修改的资源
     * @param sourceId
     * @param data
     */
    @action.bound
    setDataSource(sourceId: string | number, data = {}) {
        const {commonTableStore:store} = this.rootStore;

        const _data: AllDataSourceParams = {
            ...store.allDataSource[sourceId],
            ...data
        };

        store.allDataSource[sourceId] = _data;
    }

    /**
     *  =======================================
     *  ==  以下方法提供给外部，进行特殊操作时使用  ==
     *  =======================================
     */

    /**
     * 通过sourceid获取当前的数据 包括分页信息 搜索表单
     * @param sourceId
     */
    @action getRequestInfoBySourceId(sourceId: string | number) {
        const {commonTableStore:store} = this.rootStore;

        return store.allDataSource[sourceId];
    }

    /**
     * 获取当前请求的类型和url
     * @param sourceId
     */
    @action getRequestTypeAndUrlBySourceId(sourceId: string | number) {
        const {commonTableStore:store} = this.rootStore;

        return store.allRequestInfo[sourceId];
    }

    /**
     * 更新当前数据，根据额外参数用来控制是否根据当前的条件获取数据
     * @param sourceId 当前的sourceid
     */
    @action
    async updateData(sourceId: string, params = {}) {
        const {commonTableStore:store} = this.rootStore;

        const _ps = Object.assign({params, sourceId}, store.allRequestInfo[sourceId]);

        return await store.getData(_ps);
    }

    /**
     * 添加页面内容
     * @param sourceId
     * @param Container
     */
    @action setContainerInfo(sourceId: string|number, Container) {
        const {commonTableStore:store} = this.rootStore;

        store.allPageContainer[sourceId] = Container;
    }

    /**
     * 获取页面内容
     * @param sourceId
     * @param Container
     */
    @action getContainerInfo(sourceId: string|number) {
        const {commonTableStore:store} = this.rootStore;

        return store.allPageContainer[sourceId];
    }

    /**
     * 手动切换loading状态
     */

    @action.bound
    setLoading(state = false) {
        const {commonTableStore:store} = this.rootStore;

        store.isLoading = state;
    }

}


export default CommonTableStore;
