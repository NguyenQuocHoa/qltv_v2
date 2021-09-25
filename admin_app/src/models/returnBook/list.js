import { notification } from "antd";
import {
	getReturnBookPaging,
	getAllReturnBook
} from "../../services/returnBook";

const AllReturnBookModel = {
	namespace: "returnReturnBookList",
	state: {
		payload: [],
		success: false,
		failure: false,

		allReturnBooks: [],
		allReturnBookSuccess: false,
		allReturnBookFailure: false
	},
	effects: {
		*getAllReturnBookRequest({ payload }, { call, put }) {
			const response = yield call(getAllReturnBook, payload);
			if (response.code === 200) {
				yield put({
					type: "getAllReturnBookSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: response.message
				});
				yield put({
					type: "getAllReturnBookFailure",
					payload: response
				});
			}
		},
		*getReturnBookPagingRequest({ payload }, { call, put }) {
			const response = yield call(getReturnBookPaging, payload);
			if (response.status === 400) {
				notification.error({
					message: response.message
				});
				yield put({
					type: "getReturnBookPagingFailure",
					payload: response
				});
			} else {
				yield put({
					type: "getReturnBookPagingSuccess",
					payload: response
				});
			}
		}
	},
	reducers: {
		getAllReturnBookRequest(state, action) {
			return {
				...state,
				allReturnBookSuccess: false,
				allReturnBookFailure: false
			};
		},
		getAllReturnBookSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				allReturnBookSuccess: true,
				allReturnBookFailure: false
			};
		},
		getAllReturnBookFailure(state, action) {
			return {
				...state,
				allReturnBookSuccess: false,
				allReturnBookFailure: true
			};
		},

		getReturnBookPagingRequest(state, action) {
			return {
				...state,
				payload: [],
				success: false,
				failure: false
			};
		},
		getReturnBookPagingSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		getReturnBookPagingFailure(state, action) {
			return {
				...state,
				success: false,
				failure: true
			};
		}
	}
};
export default AllReturnBookModel;
