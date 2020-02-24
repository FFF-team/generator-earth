import { FETACH_LIST_DATA } from '../actions/list'
import { initListData } from './initState'

const listData = (state = initListData, action) => {

    switch (action.type) {

        case FETACH_LIST_DATA:

            return action.data;

        default:

            return state

    }
};

export {
    listData
}
