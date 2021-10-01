import { notification } from "antd";
import { getBookPaging, getAllBook } from "../../services/book";

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
		*getAllBookRequest({ payload }, { call, put }) {
			const response = yield call(getAllBook, payload);
			if (response.code === 200) {
				yield put({
					type: "getAllBookSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: response.message
				});
				yield put({
					type: "getAllBookFailure",
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
		getAllBookRequest(state, action) {
			return {
				...state,
				allBookSuccess: false,
				allBookFailure: false
			};
		},
		getAllBookSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				allBookSuccess: true,
				allBookFailure: false
			};
		},
		getAllBookFailure(state, action) {
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
