/*
 * @Author: liuduan
 * @Date: 2019-09-24 14:00:02
 * @LastEditors: liuduan
 * @LastEditTime: 2019-09-24 14:28:39
 * @Description: common context
 */
import { createContext } from "react";


/**
 * @description: base context
 */
export const BaseContext = createContext({
    CONTAINER_ROUTE_PREFIX: '',
});
