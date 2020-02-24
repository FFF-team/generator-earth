export const CHANGE_TOAST_STATE = 'CHANGE_TOAST_STATE';

export const changeToastState = (newState) => {

	return {

		type: CHANGE_TOAST_STATE,
		data: newState

	}

};