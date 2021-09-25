import { notification } from "antd";
import { getBookDetail } from "../../services/book";

const BookDetailModel = {
	namespace: "bookDetail",
	state: {
		payload: {},
		success: false,
		failure: false
	},
	effects: {
		*getBookDetailRequest({ id }, { call, put }) {
			const response = yield call(getBookDetail, id);
			if (response?.code === 200) {
				yield put({
					type: "getBookDetailSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: response.message
				});
				yield put({
					type: "getBookDetailFailure",
					payload: response
				});
			}
		}
	},
	reducers: {
		getBookDetailRequest(state, action) {
			return {
				...state,
				payload: {},
				success: false,
				failure: false
			};
		},
		getBookDetailSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		getBookDetailFailure(state, action) {
			return {
				...state,
				payload: action.payload,
				success: false,
				failure: true
			};
		}
	}
};
export default BookDetailModel;
