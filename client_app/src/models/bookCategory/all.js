import { notification } from "antd";
import { getAllBookCategory } from "../../services/bookCategory";

const BookCategoryAllModel = {
	namespace: "bookCategoryAll",
	state: {
		payload: [],
		success: false,
		failure: false
	},
	effects: {
		*getAllBookCategoryRequest({ payload }, { call, put }) {
			const response = yield call(getAllBookCategory, payload);
			if (response.code === 200) {
				yield put({
					type: "getAllBookCategorySuccess",
					payload: response
				});
			} else {
				notification.error({
					message: response.message
				});
				yield put({
					type: "getAllBookCategoryFailure",
					payload: response
				});
			}
		}
	},
	reducers: {
		getAllBookCategoryRequest(state, action) {
			return {
				...state,
				success: false,
				failure: false
			};
		},
		getAllBookCategorySuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		getAllBookCategoryFailure(state, action) {
			return {
				...state,
				success: false,
				failure: true
			};
		}
	}
};
export default BookCategoryAllModel;
