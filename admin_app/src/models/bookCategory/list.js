import { notification } from "antd";
import {
	getBookCategoryPaging,
	getAllBookCategory
} from "../../services/bookCategory";

const AllBookCategoryModel = {
	namespace: "bookCategoryList",
	state: {
		payload: [],
		success: false,
		failure: false,

		allBookCategorys: [],
		allBookCategorySuccess: false,
		allBookCategoryFailure: false
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
		},
		*getBookCategoryPagingRequest({ payload }, { call, put }) {
			const response = yield call(getBookCategoryPaging, payload);
			if (response.status === 400) {
				notification.error({
					message: response.message
				});
				yield put({
					type: "getBookCategoryPagingFailure",
					payload: response
				});
			} else {
				yield put({
					type: "getBookCategoryPagingSuccess",
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
		},

		getBookCategoryPagingRequest(state, action) {
			return {
				...state,
				payload: [],
				success: false,
				failure: false
			};
		},
		getBookCategoryPagingSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		getBookCategoryPagingFailure(state, action) {
			return {
				...state,
				success: false,
				failure: true
			};
		}
	}
};
export default AllBookCategoryModel;
