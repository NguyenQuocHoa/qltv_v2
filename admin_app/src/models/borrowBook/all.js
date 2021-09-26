import { notification } from "antd";
import { getAllBorrowBook } from "../../services/borrowBook";

const BorrowBookAllModel = {
	namespace: "borrowBookAll",
	state: {
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
		}
	}
};
export default BorrowBookAllModel;
