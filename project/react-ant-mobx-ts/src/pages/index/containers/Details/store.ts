/**
 * Created by Chuans on 2019/4/8
 * Author: Chuans
 * Github: https://github.com/chuans
 * Time: 4:59 PM
 */
import { observable, action, toJS } from 'mobx';
import {RootStore} from '../../store'

import { message } from 'antd';

/**
 * 注意 所有的mobx的数据都是symbol类型的数据  如果看着不方便  可以是用提供的toJS转换一下
 */

// table的唯一key，也是通过此key来进行其他操作
export const SOURCE_ID = 'DETAILS_ID';

class Store {
    rootStore:RootStore;

    constructor(store:RootStore) {
        this.rootStore = store;
    }

    @observable paramsStr: string = '请点击按钮进行获取';

    @observable requestStr: string = '请点击按钮进行获取';


    @action setParamsStr = () => {
        const {commonTableStore} =  this.rootStore

        const result = commonTableStore.getRequestInfoBySourceId(SOURCE_ID);
        // console.log(toJS(result));

        this.paramsStr = JSON.stringify(toJS(result));

    }

    @action setRequestStr = () => {
        const {commonTableStore} =  this.rootStore;

        const result = commonTableStore.getRequestTypeAndUrlBySourceId(SOURCE_ID);

        // console.log(toJS(result));

        this.requestStr = JSON.stringify(toJS(result));

    }


    @action setLoading = () => {
        const {commonTableStore} =  this.rootStore;

        commonTableStore.setLoading(true);
        message.success('5秒后loading消失')
        setTimeout(() => {
            commonTableStore.setLoading(false);
        }, 5000)
    }

    @action getPage2Data = async () => {
        const {commonTableStore} =  this.rootStore;

        const params = commonTableStore.getRequestInfoBySourceId(SOURCE_ID);

        delete params.list;
        delete params.total;

        params.pageNo = 2;

        await commonTableStore.updateData(SOURCE_ID, params);
    }
}

export default Store;
