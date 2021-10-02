import { notification } from "antd";
import { getBookCategoryDetail } from "../../services/bookCategory";

const BookCategoryDetailModel = {
	namespace: "bookCategoryDetail",
	state: {
		payload: {},
		success: false,
		failure: false
	},
	effects: {
		*getBookCategoryDetailRequest({ id }, { call, put }) {
			const response = yield call(getBookCategoryDetail, id);
			if (response?.code === 200) {
				yield put({
					type: "getBookCategoryDetailSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: response.message
				});
				yield put({
					type: "getBookCategoryDetailFailure",
					payload: response
				});
			}
		}
	},
	reducers: {
		getBookCategoryDetailRequest(state, action) {
			return {
				...state,
				payload: {},
				success: false,
				failure: false
			};
		},
		getBookCategoryDetailSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		getBookCategoryDetailFailure(state, action) {
			return {
				...state,
				payload: action.payload,
				success: false,
				failure: true
			};
		}
	}
};
export default BookCategoryDetailModel;
