import {applyMiddleware, createStore} from 'redux'
import { combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk'
// import promiseMiddleware from 'redux-promise';
import syncSagas from 'ROOT_SOURCE/sagas/index'
import syncReducers from 'ROOT_SOURCE/reducers/index'

/**
 * 统计middleware
 * 功能：
 *  控制台打印触发的action
 *  控制台打印触发的action是否为异步action（dispatching a function）   
 *  控制台打印即将改变的 新state 此时state还未改变
 */
// eslint-disable-next-line
const logger = store => next => action => {
    if(typeof action === 'function') console.log('dispatching a function');
    else console.log('dispatching', action);
    let result = next(action);
    console.log('next state', store.getState());
    return result;
}

/**
 * middleware队列
 * 排序有要求：
 *  thunk置底 
 * thunk的作用：
 *  根据传入的action类型，来实现异步action
 *  if (typeof action === 'function') {
 *    return action(dispatch, getState, extraArgument);
 *  }
 */

const sagaMiddleware = createSagaMiddleware();

let middlewares = [
    // logger,
    thunk,
    sagaMiddleware,
];

/**
 * 通过redux的compose函数 将store.dispatch和middlewares进行currying化来实现外倒内调用
 *             ----> --->   
 * 新dispatch = logger(thunk(store.dispatch))
 */
let createAppStore = applyMiddleware(...middlewares)(createStore);

let store = createAppStore( combineReducers(syncReducers) /*, {}*/ );

// 如果syncSagas为空方法的话可以注销此行
// sagaMiddleware.run(syncSagas)

// expose for inject use
store.sagaMiddleware = sagaMiddleware
store.allSagas = [/*syncSagas*/]
store.allReducers = syncReducers

// jiajianrong 20170908 暂时抛出
window.globalStore = store;


export default store;