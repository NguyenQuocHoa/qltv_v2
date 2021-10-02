import { notification } from "antd";
import {
	getBorrowBookPaging,
	getAllBorrowBook
} from "../../services/borrowBook";

const AllBorrowBookModel = {
	namespace: "borrowBookList",
	state: {
		payload: [],
		success: false,
		failure: false,

		allBorrowBooks: [],
		allBorrowBookSuccess: false,
		allBorrowBookFailure: false
	},
	effects: {
		*getAllBorrowBookRequest({ payload }, { call, put }) {
			const response = yield call(getAllBorrowBook, payload);
			if (response.code === 200) {
				yield put({
					type: "getAllBorrowBookSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: response.message
				});
				yield put({
					type: "getAllBorrowBookFailure",
					payload: response
				});
			}
		},
		*getBorrowBookPagingRequest({ payload }, { call, put }) {
			const response = yield call(getBorrowBookPaging, payload);
			if (response.status === 400) {
				notification.error({
					message: response.message
				});
				yield put({
					type: "getBorrowBookPagingFailure",
					payload: response
				});
			} else {
				yield put({
					type: "getBorrowBookPagingSuccess",
					payload: response
				});
			}
		}
	},
	reducers: {
		getAllBorrowBookRequest(state, action) {
			return {
				...state,
				allBorrowBookSuccess: false,
				allBorrowBookFailure: false
			};
		},
		getAllBorrowBookSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				allBorrowBookSuccess: true,
				allBorrowBookFailure: false
			};
		},
		getAllBorrowBookFailure(state, action) {
			return {
				...state,
				allBorrowBookSuccess: false,
				allBorrowBookFailure: true
			};
		},

		getBorrowBookPagingRequest(state, action) {
			return {
				...state,
				payload: [],
				success: false,
				failure: false
			};
		},
		getBorrowBookPagingSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		getBorrowBookPagingFailure(state, action) {
			return {
				...state,
				success: false,
				failure: true
			};
		}
	}
};
export default AllBorrowBookModel;
