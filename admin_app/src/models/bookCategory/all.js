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
				allBookCategorySuccess: false,
				allBookCategoryFailure: false
			};
		},
		getAllBookCategorySuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				allBookCategorySuccess: true,
				allBookCategoryFailure: false
			};
		},
		getAllBookCategoryFailure(state, action) {
			return {
				...state,
				allBookCategorySuccess: false,
				allBookCategoryFailure: true
			};
		}
	}
};
export default BookCategoryAllModel;
