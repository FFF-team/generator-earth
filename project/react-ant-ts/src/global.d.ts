/*
 * @Author: liuduan
 * @Date: 2019-09-18 15:51:09
 * @LastEditors: liuduan
 * @LastEditTime: 2019-10-16 10:26:33
 * @Description: 全局属性类型定义
 * @from: https://www.jianshu.com/p/9b91aa120550
 */

/**
 * 20191018 copy from 风控
 * by jiajianrong
 * 我们暂且用不上___USER_INFO___
 * 所以注销掉
 */


// window.xx
interface Window {
    globalStore: {
        [propname: string]: any;
    };
}

/* 
// window.___USER_INFO___
declare namespace ___USER_INFO___ {

    // window.___USER_INFO___.userName
    const userName: string;

    // window.___USER_INFO___.userIcon
    const userIcon: string;

    // window.___USER_INFO___.usr
    interface IUser {
        realname: string;
        userName: string;
        areaName: string;
        cityName: string;
        jobName: string;
        mobile: string;
        [propname: string]: any;
    }

    const user: IUser;

    // window.___USER_INFO___.role
    interface RoleProps {
        roleId: number;
        roleName: string;
        [propname: string]: any;
    }

    const role: RoleProps[] | undefined | null;

    // window.___USER_INFO___.resources
    interface ResourcesProps {
        name: string;
        resourceCode: string;
        type?: number;
        uri?: string;
        [propname: string]: any;
    }

    const resources: ResourcesProps[];

}
 */