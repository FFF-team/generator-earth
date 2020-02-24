import request from 'api/request'
import { changeToastState } from './common_toast'

export const FETACH_LIST_DATA = 'FETACH_LIST_DATA';

export const fetchListData = () => {

	return (dispatch, getState) => {

		dispatch(changeToastState({

			showState: true,
			toastType: 'Loading'

		}))

		request.post('/test/listDate', {})
		.then((data) => {

		    setTimeout(() => {
                dispatch ({

                    type: FETACH_LIST_DATA,
                    data: data

                })


                dispatch(changeToastState({

                    showState: false

                }))
            }, 3000)



		})

	}

};
