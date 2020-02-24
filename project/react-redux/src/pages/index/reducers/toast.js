import {CHANGE_TOAST_STATE} from '../actions/common_toast'
import { initToastData} from './initState'

export const toastData = (state = initToastData, action) => {

	switch (action.type) {

		case CHANGE_TOAST_STATE:

			return action.data

		default:

            return state

	}

}
