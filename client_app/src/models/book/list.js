import { notification } from "antd";
import { getBookPaging, getAllBookActivePaging } from "../../services/book";

const AllBookModel = {
	namespace: "bookList",
	state: {
		payload: [],
		success: false,
		failure: false,

		allBooks: [],
		allBookSuccess: false,
		allBookFailure: false
	},
	effects: {
		*getAllBookActivePagingRequest({ payload }, { call, put }) {
			const response = yield call(getAllBookActivePaging, payload);
			if (response.code === 200) {
				yield put({
					type: "getAllBookActivePagingSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: response.message
				});
				yield put({
					type: "getAllBookActivePagingFailure",
					payload: response
				});
			}
		},
		*getBookPagingRequest({ payload }, { call, put }) {
			const response = yield call(getBookPaging, payload);
			if (response.status === 400) {
				notification.error({
					message: response.message
				});
				yield put({
					type: "getBookPagingFailure",
					payload: response
				});
			} else {
				yield put({
					type: "getBookPagingSuccess",
					payload: response
				});
			}
		}
	},
	reducers: {
		getAllBookActivePagingRequest(state, action) {
			return {
				...state,
				allBookSuccess: false,
				allBookFailure: false
			};
		},
		getAllBookActivePagingSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				allBookSuccess: true,
				allBookFailure: false
			};
		},
		getAllBookActivePagingFailure(state, action) {
			return {
				...state,
				allBookSuccess: false,
				allBookFailure: true
			};
		},

		getBookPagingRequest(state, action) {
			return {
				...state,
				payload: [],
				success: false,
				failure: false
			};
		},
		getBookPagingSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		getBookPagingFailure(state, action) {
			return {
				...state,
				success: false,
				failure: true
			};
		}
	}
};
export default AllBookModel;
