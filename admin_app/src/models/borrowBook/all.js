import { notification } from "antd";
import {
	getAllBorrowBook,
	getAllBorrowBookNotReturn
} from "../../services/borrowBook";

const generateHashmap = borrowBookArr => {
	let hashmap = {};
	borrowBookArr.forEach(b => {
		hashmap[b.id] = {
			id: b.id,
			borrowBookCode: b.borrowBookCode,
			borrowBookName: b.borrowBookName
		};
	});
	return hashmap;
};

const BorrowBookAllModel = {
	namespace: "borrowBookAll",
	state: {
		hashmap: {},
		payload: [],
		success: false,
		failure: false
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
		*getAllBorrowBookNotReturnRequest({ payload }, { call, put }) {
			const response = yield call(getAllBorrowBookNotReturn, payload);
			if (response.code === 200) {
				yield put({
					type: "getAllBorrowBookNotReturnSuccess",
					payload: response
				});
			} else {
				notification.error({
					message: response.message
				});
				yield put({
					type: "getAllBorrowBookNotReturnFailure",
					payload: response
				});
			}
		}
	},
	reducers: {
		getAllBorrowBookRequest(state, action) {
			return {
				...state,
				success: false,
				failure: false
			};
		},
		getAllBorrowBookSuccess(state, action) {
			return {
				...state,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		getAllBorrowBookFailure(state, action) {
			return {
				...state,
				success: false,
				failure: true
			};
		},
		getAllBorrowBookNotReturnRequest(state, action) {
			return {
				...state,
				success: false,
				failure: false
			};
		},
		getAllBorrowBookNotReturnSuccess(state, action) {
			let borrowBookArr = [];
			if (Array.isArray(action?.payload?.items)) {
				borrowBookArr = action?.payload?.items;
			}
			let hashmap = generateHashmap(borrowBookArr);
			return {
				...state,
				hashmap,
				payload: action.payload,
				success: true,
				failure: false
			};
		},
		getAllBorrowBookNotReturnFailure(state, action) {
			return {
				...state,
				success: false,
				failure: true
			};
		}
	}
};
export default BorrowBookAllModel;
