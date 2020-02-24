import { combineReducers } from 'redux'
import { listData } from './list';
import { toastData } from './toast';

const newsApp = combineReducers({

    listData,
    toastData

});

export default newsApp
